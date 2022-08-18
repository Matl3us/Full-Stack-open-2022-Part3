const mongoose = require('mongoose')

if (process.argv.length == 3 || process.argv.length == 5) {
    const password = process.argv[2]

    const url = `mongodb+srv://phonebook:${password}@cluster0.yztspol.mongodb.net/?retryWrites=true&w=majority`

    const numberSchema = new mongoose.Schema({
        name: String,
        number: String
    })

    const Number = mongoose.model('Number', numberSchema)

    if (process.argv.length == 5) {
        const personName = process.argv[3]
        const personNumber = process.argv[4]

        mongoose
            .connect(url)
            .then((result) => {
                console.log('connected')
                const number = new Number({
                    name: personName,
                    number: personNumber
                })

                return number.save()
            })
            .then(() => {
                console.log(`added ${personName} number ${personNumber} to phonebook`)
                return mongoose.connection.close()
            })
            .catch((err) => console.log(err))
    }
    else {
        mongoose
            .connect(url)
            .then((result) => {
                Number.find({}).then(result => {
                    result.forEach(number => {
                        console.log(number)
                    })
                    mongoose.connection.close()
                })
            })
            .catch((err) => console.log(err))
    }
}
else {
    console.log('Please provide the correct number of arguments')
    process.exit(1)
}