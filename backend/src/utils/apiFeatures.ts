

export default class ApiFeatures {
    query: any;
    queryStr: any;
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    public search() {
        let keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options:`i`
            }
       }:{};
       this.query.find({...keyword});
       return this; 
    }
    // public 
}