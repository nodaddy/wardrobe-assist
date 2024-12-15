export const Banner = ({title}) => {
    return (
        <div className="banner" style={{
            background: '#946d4c',
            width: '100vw',
            marginLeft: '-30px',
            padding: '5px 0px'
        }}> 
            <h2 style={{color: 'white', paddingLeft: '30px'}} align="left">{title}</h2> 
        </div>
    )
}