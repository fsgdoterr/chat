import { connect } from "mongoose";

class DBService {

    async connect() {
        await connect(process.env.MONGO_URL, {});
    }

}

export default new DBService();