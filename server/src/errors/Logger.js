const fs = require('fs');

module.exports = async(errorLogPath, message, code, stack) => {
    const newLog =
    {
      message: message,
      time: Date.now(),
      code: code,
      stackTrace: stack.replace(new RegExp("\\r?\\n", "g"), ""),
    }
    try {
      let fileContent = JSON.parse(fs.readFileSync(errorLogPath), "utf8");
      fileContent.push(newLog);
      fs.writeFile(errorLogPath, `${JSON.stringify(fileContent)}`, (error) => {if(error) throw error });
    } catch (error) {
      let fileContent = [];
      fileContent.push(newLog);
      fs.writeFile(errorLogPath, `${JSON.stringify(fileContent).replace(new RegExp(' {', 'g'), '\n'+'{')}`, (error) => {if(error) throw error });
    }
};