/* eslint-disable */
import faker from "faker"
import Category from "../models/category.js"

const seedDB = async () => {
  	try {
        const categoriesData = []
        for (let i = 0; i < 1; i++) {
            categoriesData.push({
                _id: "_2FuYzBLy-Iq7DfH4U7Yb",
                title: faker.animal.dog(),
                sub_categories: [{
                    _category_id: "_2FuYzBLy-Iq7DfH4U7Yb",
                    _id: "NTRDOCVYgqUwuubdXIrY5",
                    title: faker.animal.cat(),
                    yearly_price: 2512,
                    is_active: faker.datatype.boolean(),
                    description: faker.lorem.sentence(),
                    image_url: faker.image.imageUrl(),
                    classes: [{
                        _id: "wndZtgkFQnyRNKnl4d_NY",
                        title: faker.animal.bear(),
                        subjects: [{
                            _id: "xtzfVmQvmSRlFikgwEalZ",
                            title: faker.animal.horse(),
                            chapters: [{
                                _id: "IUy_lDjockZunx-xdxsaK",
                                title: faker.animal.cow(),
                                questions: []
                            }]
                        }]
                    }]
                }]
            })
        }
        await Category.create(categoriesData)
        console.log("Database seeded! :)")
    } catch (err) {
        console.log(err.stack)
    }
}

export default seedDB
