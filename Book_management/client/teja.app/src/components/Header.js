function Header({ content }) {
    return (
        <>
            <div style={{
                backgroundColor: "#e5e5e5",
                padding: "15px", textAlign: "center"
            }}>
                <h1>{content}</h1>
            </div>
        </>
    )
}

Header.defaultProps = {
    content: "Books App"
}

export default Header;