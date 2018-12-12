angular.module('app')

    .factory('ngClipboard', function($compile,$rootScope,$document, Toast) {
        return {
            toClipboard: function(element, nome){
console.log("Elem", element);
console.log("Nome", nome);
            var copyElement = angular.element('<span id="ngClipboardCopyId">'+element+'</span>');
            var body = $document.find('body').eq(0);
            body.append($compile(copyElement)($rootScope));
            
            var ngClipboardElement = angular.element(document.getElementById('ngClipboardCopyId'));
            console.log(ngClipboardElement);
            var range = document.createRange();

            range.selectNode(ngClipboardElement[0]);

            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

            var successful = document.execCommand('copy');

            var msg = successful ? 'successful' : 'unsuccessful';
            if(successful){
            Toast.mostrarMensagem("o código do jogador " + nome  + " foi copiado");
            }else{
                Toast.mostrarErro("erro ao copiar código do jogador " + nome);
            }
            //console.log('Copying text command was ' + msg);
            window.getSelection().removeAllRanges();

            copyElement.remove();
        }
    }
    })

    .directive('ngCopyable', function() {
        return {
            restrict: 'A',
            link:link
        };
        function link(scope, element, attrs) {
            element.bind('click',function(){

                var range = document.createRange();
                range.selectNode(element[0]);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                var successful = document.execCommand('copy');

                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
                window.getSelection().removeAllRanges();
            });
        }

    });