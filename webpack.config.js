const pathObject=require("path")
module.exports={
  entry:{
    index:["core-js/stable","regenerator-runtime/runtime", "./source/index.js"],
    edit:["core-js/stable","regenerator-runtime/runtime", "./source/edit.js"]
  },
  output:{
    path:pathObject.resolve(__dirname, "./public/scripts"),
    filename:"[name]-bundle.js"
  },
  module:{
    rules:[{
      test:/\.js$/,
      exclude:/node_modules/,
      use:{
        loader:"babel-loader",
        options:{
          presets:["env"]
        }
      }
    }]
  },
  devServer:{
    contentBase:pathObject.resolve(__dirname, "./public" ),
    publicPath:"./scripts"
  },
  devtool:"source-map"
}
