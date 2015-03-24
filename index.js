var minimatch = require("minimatch");

module.exports = {
  rules: {
    "no-parents": function(context) {
      var whitelist = context.options.map(function(pattern) {
        return minimatch.filter(pattern);
      });

      return {
        "CallExpression": function(node) {
          var callee = node.callee;
          if (callee.type !== "Identifier") return;
          if (callee.name !== "require")    return;

          var pathNode = node.arguments[0];
          if (!pathNode)                   return;
          if (pathNode.type !== "Literal") return;

          var path = pathNode.value;
          if (typeof path !== "string") return;
          if (!path.match(/^\.\.\//))   return;

          var currentFile = context.getFilename();
          if (whitelist.some(function(test) { return test(currentFile) })) return;

          context.report(node, "Required a module from a parent directory");
        }
      };
    }
  }
};
