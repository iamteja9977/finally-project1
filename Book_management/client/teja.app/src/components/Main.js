import { useState } from "react";

import Header from "./Header";
import NavBar from "./Navbar";
import BookItem from "./BookItem";
import Loading from "./Loading";


function Main({ booksData, loading }) {

    // const [data, setData] = useState({
    //     "title": "How to Be an Antiracist",
    //     "author": "Ibram X. Kendi",
    //     "coverImageUrl": "https://images-na.ssl-images-amazon.com/images/I/51JM3rldZCL._SX329_BO1,204,203,200_.jpg",
    //     "id": "0525509283",
    //     "pageCount": 320,
    //     "publisher": "One World",
    //     "synopsis": "Antiracism is a transformative concept that reorients and reenergizes the conversation about racism—and, even more fundamentally, points us toward liberating new ways of thinking about ourselves and each other. At its core, racism is a powerful system that creates false hierarchies of human value; its warped logic extends beyond race, from the way we regard people of different ethnicities or skin colors to the way we treat people of different sexes, gender identities, and body types. Racism intersects with class and culture and geography and even changes the way we see and value ourselves. In How to Be an Antiracist, Kendi takes readers through a widening circle of antiracist ideas—from the most basic concepts to visionary possibilities—that will help readers see all forms of racism clearly, understand their poisonous consequences, and work to oppose them in our systems and in ourselves.\n\nKendi weaves an electrifying combination of ethics, history, law, and science with his own personal story of awakening to antiracism. This is an essential work for anyone who wants to go beyond the awareness of racism to the next step: contributing to the formation of a just and equitable society."
    // })

    console.log(booksData);
    return (
        <>
            <Header />
            {/* <div className="main">
                <div style={{ overflow: "auto" }}>
                  
                </div>
            </div> */}
            {loading && <Loading />}

            {booksData.map((elem, index) => {
                <BookItem key={index} elem={elem} />
            })}
            {/* <BookItem ele={booksData[6]}/> */}
            <NavBar />
        </>
    )
}

export default Main;