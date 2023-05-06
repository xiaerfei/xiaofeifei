var shell  = require('shelljs');
const YAML = require('yamljs');
const json2yaml = require('json2yaml');
const fs   = require("fs");

function debug(params) {
    var data = YAML.parse(fs.readFileSync("./_config.yml").toString());
    if (params == 'release') {
        data.remote_theme = "kitian616/jekyll-TeXt-theme";
        data.theme   = null;
        data.plugins = ["jekyll-feed", "jekyll-paginate", "jekyll-sitemap", "jemoji", "jekyll-remote-theme"];
    } else {
        data.remote_theme = null;
        data.theme   = "jekyll-text-theme";
        data.plugins = ["jekyll-feed", "jekyll-paginate", "jekyll-sitemap", "jemoji"];
    }
    var yml = json2yaml.stringify(data);
    fs.writeFileSync("./_config.yml",yml, {flag:'w', encoding: 'utf-8'}, (err) => {
        if (err) {
            console.error(err)
        }
    });
}

function publish(params) {
    if (shell.exec('git add .').code != 0) {
        console.error("git add . error")
        return
    }
    if (shell.exec("git commit -m '" + params + "' --no-verify").code != 0) {
        console.error("git commit -m '" + params + "' --no-verify" + " error")
        return
    }
    if (shell.exec('git push').code != 0) {
        console.error("git push error")
        return 
    }
}

const args  = process.argv.slice(2)
var commend = args[0];
var param   = args[1];

if (commend == 'commit') {
    debug("release");
    if(!param || param.length == 0) {
        console.error("git commit -m 注释为空")
        return;
    }
    publish(param);
} else if (commend == 'debug') {
    debug("debug");

    if (shell.exec('npm run build').code != 0) {
        console.error("npm run build error")
        return
    }
    if (shell.exec('npm run serve').code != 0) {
        console.error("npm run build error")
        return
    }
}

