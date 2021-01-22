const db = require("../db")

class Model {

    constructor(name){
        this.name=name;
    }

    async run(query){
        try{
            const response = await db.query(query);
            return response;
        }
        catch(e){
            throw new Error(e)
        }
    }

    async findById(id){
        if(!id){
            throw new Error('No ID provided!')
        }
        const query = `SELECT * FROM ${this.name} WHERE id=${parseInt(id, 10)}`
        const response = await this.run(query);
        return response;
    }

    async findByIdAndDelete(id){
        if(!id){
            throw new Error('No ID provided!')
        }
        const query = `DELETE FROM ${this.name} WHERE id=${parseInt(id, 10)}`
        const response = await this.run(query);
        return response;
    }

    async findByIdAndUpdate(id, fields){
        if(!id){
            throw new Error('No ID provided!')
        }
        const entries = Object.entries(fields); 

        const query = `UPDATE ${this.name} SET ${entries.map(([column,value])=>`${column}='${value}'`).join(",")} WHERE id=${parseInt(id)};`
        const response = await this.run(query);
        return response;
    }

    async findOne(fields){ // {name:'Luis',lastname:'Ordonez'} => 'name'="'Diego'" AND 'lastname'="'Banovaz'"
        if(!fields||Object.values(fields).length===0){
            const query = `SELECT * FROM ${this.name} LIMIT 10 OFFSET 0;`
            const response = await this.run(query);
            return response;
        }
        else{
            const entries = Object.entries(fields);
            const whereClause = `${entries.map(([key,value])=>`${key}='${value}'`).join(" AND ")}`;
            const query = `SELECT * FROM ${this.name} WHERE  ${whereClause} LIMIT 10 OFFSET 0;`
            const response = await this.run(query);
            return response;
        }
       
    }
    async save(fields){
        if(!fields || Object.values(fields).length===0){
             throw new Error("How can I create without values?")
        }
        const columns = Object.keys(fields);
        const values = Object.values(fields);
        const query = `INSERT INTO  ${this.name} (${columns.join(",")}) VALUES (${values.map(v=>`'${v}'`).join(",")});`
        const response = await this.run(query)
        return response;
    }
    async getProductReviews(pid){
        if(!pid || pid <= 0){
            throw new Error("we need a positive id")
        }
        const query = `SELECT r.comment, r.rate FROM review r INNER JOIN product p ON r.product_id=p.id WHERE r.product_id=${pid} LIMIT 10 OFFSET 0;`
        const response = await this.run(query)
        return response;
    }
    async getCategoryProducts(cid){
        if(!cid || cid <= 0){
            console.log("CID:::::::::::::", cid);
            throw new Error("we need a positive id")
        }
        const query = `SELECT p.name, p.description, p.brand, p.image_url, p.price FROM product p INNER JOIN 
        category c ON c.id=p.category WHERE c.id=${cid} LIMIT 10 OFFSET 0;`
        const response = await this.run(query)
        return response;
    }
//🎇🎆🎇🎆🎇🎆🎇🎆
}


module.exports = Model;