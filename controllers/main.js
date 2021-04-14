const mongoose = require('mongoose');

// Import models 
const PhoneModel = require('../models/phone');
const CompModel = require('../models/computer');
const BookModel = require('../models/book');

exports.main = async (req, res) => { 
    try {
        const phones = await PhoneModel.find();
        const computers = await CompModel.find();
        const books = await BookModel.find();

        res.status(200).render('main', { 
            title: 'Main', 
            phones: phones, 
            comps: computers,
            books: books
        });
    } 
    catch (e) {
        console.log(e);
    }
}


// async function addBook() {
//     const book = new BookModel({
//         img: '/images/lenovo.jpg',
//         title: 'Lenovo idepad, intel i3-8190',
//         category: ['badiiy adabiyot', 'jahon adabiyoti'],
//         price: '69 000 UZS',
//         discountPrice: '55 000 UZS',
//         rating: 5,
//         info: `2017 йил чоп этилиб бутун дунё бўйлаб жуда кўплаб шов-шув ва жиддий баҳс-мунозараларга сабаб бўлган, «Да Винчи сири» асари муаллифи Ден Брауннинг яна бир машҳур романи энди ўзбек тилида!!!

//         Бу асар 2017 йил октябр ойида АҚШ да чоп этилишига қарамай, 2 ой ичида дунёнинг 30 дан ортиқ тилига таржима қилинди ва дунё бестселлерлари сирасига кирган ҳисобланади.
        
//         «Ибтидо» - америкалик муаллиф Ден Браун қаламига мансуб триллер асар бўлиб, Роберт Ленгдон сериясида «Инферно»дан кейинги бешинчи китоб ҳисобланади. Асар воқеалари асосан Испанияда, қисман Дубай ва Будапештда юз беради. 2018 йил Август ойида асар «New York Times»нинг энг яхши сотилган китоблар рўйхатидан биринчи ўринни эгаллади ҳамда 23 ҳафта мобайнида рўйхатдан тушмади.`
//     });

//     try {
//         const savedBook = await book.save();
//         console.log(savedBook);
//     } catch (error) {
//         console.log(error);
//     }
// }

// addBook();