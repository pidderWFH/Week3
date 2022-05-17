
const handle ={
    handleError (res, err) {
        let message = "";
        if (err){
            message = err.message;
        }else {
            message = "欄位未填寫正確或無此id";
        }
        res.status(400).send({
            status: true,
            message
        }).end();
    },
    handleSucess (res, data){
        res.send({
            status: true,
            data
        }).end();
    }
}

module.exports = handle;