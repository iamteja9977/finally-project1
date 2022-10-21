import "../Footer/Footer.css"
function Footer({ content }) {
    let date = new Date().getFullYear();
    return (
        <>
            <div className="footer">
                <h4> &copy; Copyrights. All Rights Reserved {content} {date}</h4>
            </div>
        </>
    )
}

export default Footer;