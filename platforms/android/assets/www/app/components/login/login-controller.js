'use strict';

angular.module('ngapp').controller('LoginController', function(global, loginService, $cordovaKeyboard, $state, $mdDialog){

  // Limpando Parametros de Login
  global.info.cliID = null;

  global.info.usuID = null;
  // Fim da Limpeza de Parametros de Login


  // Inicializando Variaveis
  var ctrl = this;

  this.user = global.info.user || null;

  this.passwd = '';
  //Fim da Inicialização de Variaveis


  // Criando Função de Login
  this.validateUser = function(){
    loginService.login({"key": global.info.key, "user": this.user, "pass": this.passwd, "tipo": 18})
      .success(function(data){
        if(data.value == -1 || data.value == 0){
          console.log("Error: Wrong Login/Password ");
          ctrl.erroLogin();
          ctrl.passwd = '';
        } else{
          console.log("Success: Login Authorized");
          global.info.cliID = data.objects[0].cliID;
          global.info.usuID = data.objects[0].usuID;
          global.info.seeCmd = data.objects[0].visualizaComandos;
          global.info.user = ctrl.user;
          $state.go('main');
        }
      })
      .error(function(err){
        console.log("Error " + err + ": Sem Conexão");
        ctrl.semConexao();
        ctrl.passwd = '';
      });
  };
  // Fim da Função de Login


  this.erroLogin = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#ErroLogin')))
        .clickOutsideToClose(true)
        .title('')
        .content('Login ou Senha incorreto.')
        .ariaLabel('Erro Login')
        .ok('Ok')
        .targetEvent(ev)
    );
  };

  this.semConexao = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#ErroConexão')))
        .clickOutsideToClose(true)
        .title('')
        .content('Sem conexão com a internet.')
        .ariaLabel('Erro Conecxão')
        .ok('Ok')
        .targetEvent(ev)
    );
  };


  // Criando Listener Para Fechar o Teclado com Click Fora do Elemento Ativo
  document.addEventListener("click", function(){
    document.activeElement.blur();
  });
  // Fim da Criação do Listener
});
