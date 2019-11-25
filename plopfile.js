module.exports = function (plop) {

    plop.addPartial('greeting', 'Hello, my name is {{ properCase name }} .');

    plop.setGenerator('component', {
        description: 'components logic',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'components name please'
        }, {
            type: 'confirm',
            name: 'hasState',
            message: 'Do you want to add a state?'
        }],
        actions: function(data) {
            var addState = {
                type: 'append',
                path: 'src/components/{{name}}/{{name}}.js',
                pattern: /(-- ADD STATES HERE --)/gi,
                template: 'test State'
            };
            var actions = [
                {
                    type: 'add',
                    path: 'src/components/{{name}}/{{name}}.js',
                    templateFile: 'plop-templates/component.hbs'
                },
                {
                    type: 'add',
                    path: 'src/components/{{name}}/{{name}}.scss',
                    templateFile: 'plop-templates/Sass,scss.hbs'
                }
            ];
            return actions;
        }
    });
};