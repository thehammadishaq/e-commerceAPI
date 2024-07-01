const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price'],
        maxlength: [5, 'Price cannot be more than 5 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please provide category'],
        enum: [
            'Electronics',
            'Cameras',
            'Laptops',
            'Headphones',
            'Food',
            'Books',
            'Clothes',
            'Shoes',
            'Accessories',
            'Games',
            'Sports'
        ]
    },
    company: {
        type: String,
        required: [true, 'Please provide company'],
        enum: [
            'apple',
            'sony',
            'samsung',
            'canon',

            'dell',
            'lenovo',
            'asus',
            'hp'
        ]
    },
    color: {
        type: String,
        required: [true, 'Please provide color'],
        enum: [
            'black',
            'brown',
            'blue',
            'green',
        ]
    },
    featured: {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
}

}

}





})