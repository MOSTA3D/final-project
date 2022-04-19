function MyGridIcon(){
    return (
        <div className="my-grid-icon">
            {Array(9).fill().map((el,i)=><span key={i}></span>)}
        </div>
    )
}

export default MyGridIcon;