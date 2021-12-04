import faker from "faker";
import Category from "../models/category.js";

const seedDB = async () => {
    
    try {
        let categoriesData = [];
        for (let i = 0; i < 5; i++) {
            const title = faker.name.jobTitle();
            categoriesData.push({
                title,
            });
        }
        await Category.create(categoriesData);
        console.log("Database seeded! :)");
    } catch (err) {
        console.log(err.stack);
    }
}

export default seedDB;
