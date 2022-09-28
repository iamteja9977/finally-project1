function Footer({content}){
    // let date=new Date().getDate()
    return(
        <>
        <div className="footer">
            <h1>TEJAVATH THIRUPATHI </h1>
            <h1> &copy; Copyrights . All rights are reserved {content}</h1> 
  {/* <h2> {date}</h2> */}
</div>
        </>
    )
}
export default Footer;