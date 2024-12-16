export const Banner = ({title, icon}) => {
    return (
        <div className="banner" style={{
            background: '#946d4c',
            width: '100vw',
            marginLeft: '-30px',
            padding: '5px 0px'
        }}> 
            <h3 style={{color: 'white', paddingLeft: '30px', fontWeight: '500'}} align="left">{icon} &nbsp;{title}</h3> 
        </div>
    )
}