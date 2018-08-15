const webpack = require("webpack");
const legacyConfig = require("./webpack.config.legacy");
const esmodulesConfig = require("./webpack.config.esmodule");

const legacyCompiler = webpack(legacyConfig);
const esmodulesCompiler = webpack(esmodulesConfig);
legacyCompiler.run((err, stats) =>{
    if(err){
        console.error(err);
        return;
    }

    esmodulesCompiler.run((err2, stats2) =>{
        if(err){
            console.error(err);
            return;
        }
    })
})
