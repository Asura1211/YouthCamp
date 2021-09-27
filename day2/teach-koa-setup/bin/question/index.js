import inquirer from 'inquirer';

export function question(){
    // node.js支持顶层 await
    return inquirer.prompt([
        { type: "input", name: "packageName", message: "set package name" },
        { type: "number", name: "port", message: "set port number", default:()=>8080},
        {
            type: "checkbox",
            name: "middleware",
            choices: [
                {
                    name: "koaStatic",
                },
                {
                    name: "koaRouter",
                },
            ],
        },
    ]);
}


