export const Banner = ({title, icon}) => {
    return (
        <div className="banner" style={{
            background: '#fb9a7a',
            width: '100vw',
            marginLeft: '-30px',
            padding: '5px 0px',
            position: 'fixed',
            top: '0px',
            zIndex: '99999'
        }}> 
            <h3 style={{color: 'white', paddingLeft: '30px', fontWeight: '500'}} align="left">{icon} &nbsp;{title}</h3> 
        </div>
    )
}