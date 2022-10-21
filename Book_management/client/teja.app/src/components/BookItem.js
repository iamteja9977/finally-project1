function BookItem({ elem }) {
    // const { elem } = props;
    return (
        <div>
            <center>
                <h2 className="book">{elem.title} - <span className="author">{elem.author}</span></h2>
                <h4>Publisher  - <span className="author">{elem.publisher}</span></h4>
                <img src={elem.coverImageUrl} alt="Voice of Art" height={"250px"}></img>
                <p style={{ textAlign: "justify" }}>{elem.synopsis}</p>
            </center>
        </div>
    )
}

export default BookItem;