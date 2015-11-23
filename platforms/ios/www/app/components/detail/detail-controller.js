'use strict';

angular.module('ngapp').controller('DetailController', function(global, $state, $stateParams, detailService, $timeout, $mdDialog, $rootScope){

  // Inicio Condições Iniciais
  $rootScope.startload();

  if($stateParams.veiculoData == null){
    $rootScope.endload();
    $state.go('main');
  }
  // Fim Condições Iniciais


  // Inicio Definição de Variaveis
  var ctrl = this;

  this.eqp = $stateParams.veiculoData;

  this.status = [];

  this.cmdList = [];
  // Fim Definição de Variaveis


  if(this.eqp.sinonimo != this.eqp.identificador){
    this.title = (this.eqp.identificador + " / " + this.eqp.sinonimo);
  } else{
    this.title = this.eqp.identificador;
  }


  // Inicio Lista de Comandos Web API
  this.listarComandos = function(){
    detailService.list({"key": global.info.key, "usuID": global.info.usuID, "grpID": 0, "eqpTipo": ctrl.eqp.tipoEqpFixoPortatil, "idEquipamento": ctrl.eqp.id})
    .success(function(data){
      if(data.value == -1 || data.value == 0){
        console.log("Error: Nothing Here");
      } else{
        console.log("Success: List Loaded");
        var leng = data.objects.length;
        for(var i = 0; i < leng; i++){
          if(i == 0){
            ctrl.status.push({
              title: data.objects[i].descricao,
              idCmd: data.objects[i].idCmd,
              success: false
            });
            var j = 0;
          }
          if(data.objects[i].descricao != ctrl.status[j].title){
            ctrl.status.push({
              title: data.objects[i].descricao,
              idCmd: data.objects[i].idCmd,
              success: false
            });
            j++;
          }
        }
      }
    })
    .error(function(err){
      console.log("Error " + err + ": Sem Conexão");
    });
  };

  this.listarComandos();

  this.enviaComando = function(cmd){
    detailService.send({"key": global.info.key, "usuID": global.info.usuID, "grpID": 0, "eqpTipo": ctrl.eqp.tipoEqpFixoPortatil, "idEquipamento": ctrl.eqp.id, "idCdm": cmd.idCmd})
    .success(function(data){
      if(data.value == -1 || data.value == 0){
        console.log("Error: Something Wrong");
        ctrl.envioError();
      } else{
        console.log("Success: List Loaded");
        ctrl.envioSuccess();
        // Inicio Falso Callback de Comando Executado
        $timeout(function(){
          cmd.success = true;
        }, 5000);
        // Fim Falso Callback de Comando Executado
      }
    })
    .error(function(err){
      console.log("Error " + err + ": Sem Conexão");
      ctrl.semConexao();
    });
  };
  // Fim Lista de Comandos Web API


  // Inicio Lista de Dialogos
  this.confirmarEnvio = function(snd, ev) {
    var confirm = $mdDialog.confirm()
      .title(snd.title + ',')
      .content('deseja enviar o comando?')
      .ariaLabel('ConfirmarEnvio')
      .targetEvent(ev)
      .ok('Sim')
      .cancel('Não');
    $mdDialog.show(confirm).then(function() {
      ctrl.enviaComando(snd);
    }, function() {
      return;
    });
  };

  this.envioSuccess = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#Success')))
        .clickOutsideToClose(true)
        .title('Comando enviado,')
        .content(' aguarde a confirmação.')
        .ariaLabel('Success')
        .ok('Ok')
        .targetEvent(ev)
    );
  };

  this.envioError = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#ErroEnvio')))
        .clickOutsideToClose(true)
        .title('Ops!')
        .content('O comando não pode ser enviado, tente novamente.')
        .ariaLabel('Erro Envio')
        .ok('Ok')
        .targetEvent(ev)
    );
  };

  this.semConexao = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#ErroConexão')))
        .clickOutsideToClose(true)
        .title('Ops!')
        .content('Sem conexão com a internet.')
        .ariaLabel('Erro Conecxão')
        .ok('Ok')
        .targetEvent(ev)
    );
  };
  // Fim Lista de Dialogos
});
