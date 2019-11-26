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

    plop.setGenerator('setup', {
        description: 'setup your application',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Extension name?'
            },
            {
                type: 'input',
                name: 'description',
                message: 'Description?'
            },
            {
                type: 'list',
                name: 'chromeAction',
                message: 'Extension action?',
                choices: ['browser', 'page']
            }
            ],
        actions: function(data) {
            var addState = {
                type: 'modify',
                path: 'src/components/{{name}}/{{name}}.js',
                pattern: /(-- ADD STATES HERE --)/gi,
                template: 'test State'
            };
            const actions = [];

            let paths = ['package.json', 'manifest.json'];

            paths.forEach(item => {
                actions.push({
                    type: 'modify',
                    path: item,
                    pattern: /\"name\"\s*:.+?,/gi,
                    template: '"name": "{{name}}",'
                })
            });

            paths.forEach(item => {
                actions.push({
                    type: 'modify',
                    path: item,
                    pattern: /\"description\"\s*:.+?,/gi,
                    template: '"description": "{{description}}",'
                })
            });


            actions.push({
                type: 'modify',
                path: 'manifest.json',
                pattern: /\"default_title\"\s*:.+?,/gi,
                template: '"default_title": "{{name}}",'
            });


            actions.push({
                type: 'modify',
                path: 'manifest.json',
                pattern: /browser_action/gi,
                template: `${data.chromeAction}_action`
            });


            actions.push({
                type: 'modify',
                path: 'src/background.js',
                pattern: /'starting\s+.+?'/gi,
                template: '\'Starting {{name}}\''
            });

            return actions;
        }
    });
};