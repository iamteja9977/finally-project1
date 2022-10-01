function Footer({ content }) {
    console.log(content);
    // let date = new Date().getDate();
    return (
        <>
            <div className="footer">
                <h1>Code for India</h1>
                <h4>&copy; Copyrights. All Rights Reserved {content}</h4>
                {/* <h3>{date}</h3> */}
            </div>
        </>
    )
}

export default Footer;