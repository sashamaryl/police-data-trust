import 'leaflet/dist/leaflet.css'
import React, { useState } from 'react'
import { GeoJSON, MapContainer, useMap } from 'react-leaflet'
import States from "./map-assets/gz_2010_us_040_00_5m.json"
import Counties from "./map-assets/gz_2010_us_050_00_5m.json"
import styles from './map.module.css'

export default function Map() {

    let center = [35, -90]
    let startingZoom = 4
    const [selectedState, setSelectedState] = useState(1)

    return (
        <div className={styles.mappage} >
            <Header />
            <div className={styles.mapframe}>
                <MapContainer
                    center={center}
                    zoom={startingZoom}
                    className={styles.mapcontainer}
                >
                    <GeoDataStates selectedState={selectedState} setSelectedState={setSelectedState} counties={Counties} />
                </MapContainer>
            </div>
        </div>
    )
}

export function GeoDataStates() {

    const map = useMap()

    const [gState, setGState] = useState()

    const onEachFeature = (feature, layer) => {
        layer.bindPopup(feature.properties.NAME)
        layer.on('click', () => setGState(Number(feature.properties.STATE)))
    }

    const onEachFeatureCounty = (feature, layer) => {
        layer.bindPopup(`${feature.properties.NAME}, ${feature.properties.STATE}`)
    }

    const style = (feature) => {
        const st = feature.properties.STATE;
        return {
            fill: true,
            fillColor: "#7da1bb",
            fillOpacity: `0.${80 - st}`,
            stroke: false
        }
    }

    const styleCounty = (feature) => {
        const st = feature.properties.COUNTY;
        return {
            fill: true,
            fillColor: "#7DA1BB",
            fillOpacity: `0.${120 - st}`,
            stroke: true,
            strokeWeight: "0.5px",
            color: "#7DA1BB",
            opacity: `0.${80 - st}`,
        }
    }

    const filterCounties = (stateCode) => {
        return {
            "type": "FeatureCollection",
            "features": Counties.features.filter(feature => Number(feature.properties.STATE) === stateCode)
        }
    }

    const stateCountyFiltered = filterCounties(gState)
    const flyToTargetState = (e) => map.flyToBounds(e.sourceTarget.getBounds(), { padding: [20, 20], duration: 1 })

    return <>
        <GeoJSON
            data={States}
            style={style}
            onEachFeature={onEachFeature}
            eventHandlers={{
                click(e) { flyToTargetState(e) }
            }}
        />
        <GeoJSON
            data={stateCountyFiltered}
            key={gState}
            style={styleCounty}
            onEachFeature={onEachFeatureCounty}
        />
    </>
}

export function Header() {
    return <div>
        <div style={{ position: 'absolute', backgroundColor: "#7CAED7", flex: "0 0 15%", width: "1152", height: "58" }}>
            <svg width="1152" height="74"></svg>
        </div>
        <div style={{ position: 'relative', width: "1152", height: "158" }}>
            <svg width="1152" height="122" viewBox="0 0 1152 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1152" height="75.8084" fill="url(#pattern0)" />
                <rect x="95" y="27" width="95" height="95" fill="url(#pattern1)" />
                <path d="M211.803 50.6364H207.517V63.4432H207.338L198.548 50.6364H194.77V71H199.075V58.1832H199.224L208.084 71H211.803V50.6364ZM219.335 71.2884C221.592 71.2884 223.054 70.304 223.8 68.8821H223.919V71H227.936V60.6989C227.936 57.0597 224.854 55.5284 221.453 55.5284C217.794 55.5284 215.388 57.2784 214.801 60.0625L218.719 60.3807C219.007 59.3665 219.912 58.6207 221.433 58.6207C222.875 58.6207 223.7 59.3466 223.7 60.5994V60.6591C223.7 61.6435 222.656 61.7727 220.001 62.0312C216.979 62.3097 214.264 63.3239 214.264 66.7344C214.264 69.7571 216.422 71.2884 219.335 71.2884ZM220.548 68.3651C219.246 68.3651 218.311 67.7585 218.311 66.5952C218.311 65.402 219.296 64.8153 220.787 64.6065C221.712 64.4773 223.223 64.2585 223.73 63.9205V65.5412C223.73 67.142 222.408 68.3651 220.548 68.3651ZM239.046 55.7273H236.172V52.0682H231.937V55.7273H229.849V58.9091H231.937V66.8636C231.917 69.8565 233.955 71.3381 237.027 71.2088C238.121 71.169 238.897 70.9503 239.324 70.8111L238.658 67.6591C238.449 67.6989 238.002 67.7983 237.604 67.7983C236.759 67.7983 236.172 67.4801 236.172 66.3068V58.9091H239.046V55.7273ZM241.505 71H245.741V55.7273H241.505V71ZM243.633 53.7585C244.896 53.7585 245.93 52.794 245.93 51.6108C245.93 50.4375 244.896 49.473 243.633 49.473C242.38 49.473 241.346 50.4375 241.346 51.6108C241.346 52.794 242.38 53.7585 243.633 53.7585ZM255.735 71.2983C260.368 71.2983 263.252 68.1264 263.252 63.4233C263.252 58.6903 260.368 55.5284 255.735 55.5284C251.101 55.5284 248.218 58.6903 248.218 63.4233C248.218 68.1264 251.101 71.2983 255.735 71.2983ZM255.755 68.017C253.617 68.017 252.523 66.0582 252.523 63.3935C252.523 60.7287 253.617 58.7599 255.755 58.7599C257.853 58.7599 258.946 60.7287 258.946 63.3935C258.946 66.0582 257.853 68.017 255.755 68.017ZM269.942 62.1705C269.952 60.2017 271.125 59.0483 272.835 59.0483C274.536 59.0483 275.56 60.1619 275.55 62.0312V71H279.786V61.2756C279.786 57.7159 277.697 55.5284 274.516 55.5284C272.249 55.5284 270.608 56.642 269.922 58.4219H269.743V55.7273H265.706V71H269.942V62.1705ZM287.179 71.2884C289.436 71.2884 290.898 70.304 291.644 68.8821H291.763V71H295.78V60.6989C295.78 57.0597 292.698 55.5284 289.297 55.5284C285.638 55.5284 283.232 57.2784 282.645 60.0625L286.563 60.3807C286.851 59.3665 287.756 58.6207 289.277 58.6207C290.719 58.6207 291.544 59.3466 291.544 60.5994V60.6591C291.544 61.6435 290.5 61.7727 287.845 62.0312C284.823 62.3097 282.108 63.3239 282.108 66.7344C282.108 69.7571 284.266 71.2884 287.179 71.2884ZM288.392 68.3651C287.09 68.3651 286.155 67.7585 286.155 66.5952C286.155 65.402 287.139 64.8153 288.631 64.6065C289.555 64.4773 291.067 64.2585 291.574 63.9205V65.5412C291.574 67.142 290.251 68.3651 288.392 68.3651ZM303.002 50.6364H298.766V71H303.002V50.6364ZM312.355 71H316.66V64.3977H320.28C324.963 64.3977 327.687 61.6037 327.687 57.5369C327.687 53.4901 325.013 50.6364 320.389 50.6364H312.355V71ZM316.66 60.9474V54.1562H319.564C322.05 54.1562 323.253 55.5085 323.253 57.5369C323.253 59.5554 322.05 60.9474 319.584 60.9474H316.66ZM336.759 71.2983C341.392 71.2983 344.276 68.1264 344.276 63.4233C344.276 58.6903 341.392 55.5284 336.759 55.5284C332.125 55.5284 329.242 58.6903 329.242 63.4233C329.242 68.1264 332.125 71.2983 336.759 71.2983ZM336.779 68.017C334.641 68.017 333.547 66.0582 333.547 63.3935C333.547 60.7287 334.641 58.7599 336.779 58.7599C338.877 58.7599 339.971 60.7287 339.971 63.3935C339.971 66.0582 338.877 68.017 336.779 68.017ZM350.966 50.6364H346.73V71H350.966V50.6364ZM354.059 71H358.295V55.7273H354.059V71ZM356.187 53.7585C357.45 53.7585 358.484 52.794 358.484 51.6108C358.484 50.4375 357.45 49.473 356.187 49.473C354.934 49.473 353.9 50.4375 353.9 51.6108C353.9 52.794 354.934 53.7585 356.187 53.7585ZM368.289 71.2983C372.355 71.2983 374.911 68.9119 375.11 65.402H371.112C370.864 67.0327 369.79 67.9474 368.338 67.9474C366.36 67.9474 365.077 66.2869 365.077 63.3636C365.077 60.4801 366.37 58.8295 368.338 58.8295C369.889 58.8295 370.884 59.8537 371.112 61.375H375.11C374.931 57.8452 372.256 55.5284 368.269 55.5284C363.635 55.5284 360.772 58.7401 360.772 63.4233C360.772 68.0668 363.585 71.2983 368.289 71.2983ZM384.482 71.2983C388.26 71.2983 390.806 69.4588 391.402 66.625L387.485 66.3665C387.057 67.5298 385.963 68.1364 384.551 68.1364C382.434 68.1364 381.091 66.7344 381.091 64.4574V64.4474H391.492V63.2841C391.492 58.0938 388.35 55.5284 384.313 55.5284C379.818 55.5284 376.905 58.7202 376.905 63.4332C376.905 68.2756 379.779 71.2983 384.482 71.2983ZM381.091 61.8224C381.181 60.0824 382.503 58.6903 384.382 58.6903C386.222 58.6903 387.495 60.0028 387.505 61.8224H381.091ZM407.435 71C413.639 71 417.398 67.1619 417.398 60.7983C417.398 54.4545 413.639 50.6364 407.494 50.6364H400.216V71H407.435ZM404.521 67.3111V54.3253H407.266C411.084 54.3253 413.102 56.2741 413.102 60.7983C413.102 65.3423 411.084 67.3111 407.256 67.3111H404.521ZM424.563 71.2884C426.82 71.2884 428.281 70.304 429.027 68.8821H429.146V71H433.163V60.6989C433.163 57.0597 430.081 55.5284 426.681 55.5284C423.021 55.5284 420.615 57.2784 420.029 60.0625L423.946 60.3807C424.235 59.3665 425.139 58.6207 426.661 58.6207C428.102 58.6207 428.928 59.3466 428.928 60.5994V60.6591C428.928 61.6435 427.884 61.7727 425.229 62.0312C422.206 62.3097 419.492 63.3239 419.492 66.7344C419.492 69.7571 421.649 71.2884 424.563 71.2884ZM425.776 68.3651C424.473 68.3651 423.538 67.7585 423.538 66.5952C423.538 65.402 424.523 64.8153 426.014 64.6065C426.939 64.4773 428.45 64.2585 428.958 63.9205V65.5412C428.958 67.142 427.635 68.3651 425.776 68.3651ZM444.273 55.7273H441.4V52.0682H437.164V55.7273H435.076V58.9091H437.164V66.8636C437.144 69.8565 439.182 71.3381 442.255 71.2088C443.349 71.169 444.124 70.9503 444.552 70.8111L443.886 67.6591C443.677 67.6989 443.229 67.7983 442.832 67.7983C441.986 67.7983 441.4 67.4801 441.4 66.3068V58.9091H444.273V55.7273ZM451.088 71.2884C453.345 71.2884 454.806 70.304 455.552 68.8821H455.671V71H459.688V60.6989C459.688 57.0597 456.606 55.5284 453.206 55.5284C449.546 55.5284 447.14 57.2784 446.554 60.0625L450.471 60.3807C450.76 59.3665 451.664 58.6207 453.186 58.6207C454.627 58.6207 455.453 59.3466 455.453 60.5994V60.6591C455.453 61.6435 454.409 61.7727 451.754 62.0312C448.731 62.3097 446.017 63.3239 446.017 66.7344C446.017 69.7571 448.174 71.2884 451.088 71.2884ZM452.301 68.3651C450.998 68.3651 450.063 67.7585 450.063 66.5952C450.063 65.402 451.048 64.8153 452.539 64.6065C453.464 64.4773 454.975 64.2585 455.483 63.9205V65.5412C455.483 67.142 454.16 68.3651 452.301 68.3651ZM486.902 57.7656C486.335 53.0625 482.776 50.358 478.063 50.358C472.683 50.358 468.577 54.1562 468.577 60.8182C468.577 67.4602 472.614 71.2784 478.063 71.2784C483.283 71.2784 486.435 67.8082 486.902 64.0597L482.547 64.0398C482.139 66.2173 480.429 67.4702 478.132 67.4702C475.04 67.4702 472.942 65.1733 472.942 60.8182C472.942 56.5824 475.01 54.1662 478.162 54.1662C480.519 54.1662 482.219 55.5284 482.547 57.7656H486.902ZM496.51 71.2983C501.144 71.2983 504.027 68.1264 504.027 63.4233C504.027 58.6903 501.144 55.5284 496.51 55.5284C491.877 55.5284 488.993 58.6903 488.993 63.4233C488.993 68.1264 491.877 71.2983 496.51 71.2983ZM496.53 68.017C494.393 68.017 493.299 66.0582 493.299 63.3935C493.299 60.7287 494.393 58.7599 496.53 58.7599C498.628 58.7599 499.722 60.7287 499.722 63.3935C499.722 66.0582 498.628 68.017 496.53 68.017ZM510.837 71.2884C513.094 71.2884 514.556 70.304 515.301 68.8821H515.421V71H519.438V60.6989C519.438 57.0597 516.355 55.5284 512.955 55.5284C509.296 55.5284 506.889 57.2784 506.303 60.0625L510.22 60.3807C510.509 59.3665 511.414 58.6207 512.935 58.6207C514.377 58.6207 515.202 59.3466 515.202 60.5994V60.6591C515.202 61.6435 514.158 61.7727 511.503 62.0312C508.48 62.3097 505.766 63.3239 505.766 66.7344C505.766 69.7571 507.924 71.2884 510.837 71.2884ZM512.05 68.3651C510.747 68.3651 509.813 67.7585 509.813 66.5952C509.813 65.402 510.797 64.8153 512.289 64.6065C513.213 64.4773 514.725 64.2585 515.232 63.9205V65.5412C515.232 67.142 513.909 68.3651 512.05 68.3651ZM526.66 50.6364H522.424V71H526.66V50.6364ZM529.753 71H533.989V55.7273H529.753V71ZM531.881 53.7585C533.143 53.7585 534.178 52.794 534.178 51.6108C534.178 50.4375 533.143 49.473 531.881 49.473C530.628 49.473 529.594 50.4375 529.594 51.6108C529.594 52.794 530.628 53.7585 531.881 53.7585ZM545.205 55.7273H542.332V52.0682H538.096V55.7273H536.008V58.9091H538.096V66.8636C538.076 69.8565 540.114 71.3381 543.187 71.2088C544.281 71.169 545.056 70.9503 545.484 70.8111L544.818 67.6591C544.609 67.6989 544.161 67.7983 543.764 67.7983C542.918 67.7983 542.332 67.4801 542.332 66.3068V58.9091H545.205V55.7273ZM547.665 71H551.9V55.7273H547.665V71ZM549.792 53.7585C551.055 53.7585 552.089 52.794 552.089 51.6108C552.089 50.4375 551.055 49.473 549.792 49.473C548.54 49.473 547.505 50.4375 547.505 51.6108C547.505 52.794 548.54 53.7585 549.792 53.7585ZM561.894 71.2983C566.528 71.2983 569.411 68.1264 569.411 63.4233C569.411 58.6903 566.528 55.5284 561.894 55.5284C557.261 55.5284 554.377 58.6903 554.377 63.4233C554.377 68.1264 557.261 71.2983 561.894 71.2983ZM561.914 68.017C559.776 68.017 558.682 66.0582 558.682 63.3935C558.682 60.7287 559.776 58.7599 561.914 58.7599C564.012 58.7599 565.106 60.7287 565.106 63.3935C565.106 66.0582 564.012 68.017 561.914 68.017ZM576.101 62.1705C576.111 60.2017 577.284 59.0483 578.995 59.0483C580.695 59.0483 581.719 60.1619 581.709 62.0312V71H585.945V61.2756C585.945 57.7159 583.857 55.5284 580.675 55.5284C578.408 55.5284 576.767 56.642 576.081 58.4219H575.902V55.7273H571.865V71H576.101V62.1705Z" fill="#303463" />
                <path d="M193.676 82.9119H196.878V92H198.111V82.9119H201.312V81.8182H193.676V82.9119ZM203.93 87.4062C203.93 86.0739 204.78 85.3182 205.938 85.3182C207.042 85.3182 207.708 86.0142 207.708 87.2273V92H208.881V87.1477C208.881 85.1839 207.837 84.2642 206.276 84.2642C205.073 84.2642 204.387 84.7663 204.029 85.5568H203.93V81.8182H202.756V92H203.93V87.4062ZM213.929 92.1591C215.481 92.1591 216.614 91.3835 216.972 90.2301L215.839 89.9119C215.54 90.7074 214.849 91.1051 213.929 91.1051C212.552 91.1051 211.603 90.2152 211.548 88.5795H217.091V88.0824C217.091 85.2386 215.401 84.2642 213.81 84.2642C211.742 84.2642 210.37 85.8949 210.37 88.2415C210.37 90.5881 211.722 92.1591 213.929 92.1591ZM211.548 87.5653C211.628 86.3771 212.468 85.3182 213.81 85.3182C215.083 85.3182 215.898 86.2727 215.898 87.5653H211.548ZM223.387 87.4062C223.387 86.0739 224.212 85.3182 225.336 85.3182C226.425 85.3182 227.086 86.0291 227.086 87.2273V92H228.259V87.1477C228.259 85.1989 227.22 84.2642 225.674 84.2642C224.521 84.2642 223.805 84.7812 223.447 85.5568H223.347V84.3636H222.214V92H223.387V87.4062ZM232.35 92.179C233.683 92.179 234.379 91.4631 234.617 90.9659H234.677V92H235.85V86.9688C235.85 84.5426 234.001 84.2642 233.026 84.2642C231.873 84.2642 230.561 84.6619 229.964 86.054L231.078 86.4517C231.336 85.8949 231.948 85.2983 233.066 85.2983C234.145 85.2983 234.677 85.87 234.677 86.8494V86.8892C234.677 87.456 234.1 87.4062 232.708 87.5852C231.291 87.7692 229.745 88.0824 229.745 89.8324C229.745 91.3239 230.899 92.179 232.35 92.179ZM232.529 91.125C231.595 91.125 230.919 90.7074 230.919 89.892C230.919 88.9972 231.734 88.7188 232.649 88.5994C233.146 88.5398 234.478 88.4006 234.677 88.1619V89.2358C234.677 90.1903 233.921 91.125 232.529 91.125ZM241.013 84.3636H239.382V82.5341H238.209V84.3636H237.055V85.358H238.209V90.1307C238.209 91.4631 239.283 92.0994 240.277 92.0994C240.715 92.0994 240.993 92.0199 241.152 91.9602L240.913 90.9062C240.814 90.9261 240.655 90.9659 240.396 90.9659C239.879 90.9659 239.382 90.8068 239.382 89.8125V85.358H241.013V84.3636ZM242.478 92H243.651V84.3636H242.478V92ZM243.074 83.0909C243.532 83.0909 243.91 82.733 243.91 82.2955C243.91 81.858 243.532 81.5 243.074 81.5C242.617 81.5 242.239 81.858 242.239 82.2955C242.239 82.733 242.617 83.0909 243.074 83.0909ZM248.602 92.1591C250.67 92.1591 252.063 90.5881 252.063 88.2216C252.063 85.8352 250.67 84.2642 248.602 84.2642C246.534 84.2642 245.142 85.8352 245.142 88.2216C245.142 90.5881 246.534 92.1591 248.602 92.1591ZM248.602 91.1051C247.031 91.1051 246.315 89.7528 246.315 88.2216C246.315 86.6903 247.031 85.3182 248.602 85.3182C250.173 85.3182 250.889 86.6903 250.889 88.2216C250.889 89.7528 250.173 91.1051 248.602 91.1051ZM254.727 87.4062C254.727 86.0739 255.552 85.3182 256.676 85.3182C257.764 85.3182 258.426 86.0291 258.426 87.2273V92H259.599V87.1477C259.599 85.1989 258.56 84.2642 257.014 84.2642C255.86 84.2642 255.144 84.7812 254.787 85.5568H254.687V84.3636H253.554V92H254.727V87.4062ZM263.69 92.179C265.023 92.179 265.719 91.4631 265.957 90.9659H266.017V92H267.19V86.9688C267.19 84.5426 265.341 84.2642 264.366 84.2642C263.213 84.2642 261.9 84.6619 261.304 86.054L262.417 86.4517C262.676 85.8949 263.287 85.2983 264.406 85.2983C265.485 85.2983 266.017 85.87 266.017 86.8494V86.8892C266.017 87.456 265.44 87.4062 264.048 87.5852C262.631 87.7692 261.085 88.0824 261.085 89.8324C261.085 91.3239 262.238 92.179 263.69 92.179ZM263.869 91.125C262.934 91.125 262.258 90.7074 262.258 89.892C262.258 88.9972 263.074 88.7188 263.988 88.5994C264.486 88.5398 265.818 88.4006 266.017 88.1619V89.2358C266.017 90.1903 265.261 91.125 263.869 91.125ZM270.205 81.8182H269.032V92H270.205V81.8182ZM275.691 92H276.865V84.3636H275.691V92ZM276.288 83.0909C276.745 83.0909 277.123 82.733 277.123 82.2955C277.123 81.858 276.745 81.5 276.288 81.5C275.831 81.5 275.453 81.858 275.453 82.2955C275.453 82.733 275.831 83.0909 276.288 83.0909ZM279.887 87.4062C279.887 86.0739 280.712 85.3182 281.836 85.3182C282.925 85.3182 283.586 86.0291 283.586 87.2273V92H284.759V87.1477C284.759 85.1989 283.72 84.2642 282.174 84.2642C281.021 84.2642 280.305 84.7812 279.947 85.5568H279.847V84.3636H278.714V92H279.887V87.4062ZM289.487 92.1591C290.958 92.1591 291.455 91.2443 291.714 90.8267H291.853V92H292.987V81.8182H291.813V85.5767H291.714C291.455 85.179 290.998 84.2642 289.507 84.2642C287.578 84.2642 286.245 85.7955 286.245 88.2017C286.245 90.6278 287.578 92.1591 289.487 92.1591ZM289.646 91.1051C288.174 91.1051 287.419 89.8125 287.419 88.1818C287.419 86.571 288.154 85.3182 289.646 85.3182C291.078 85.3182 291.833 86.4716 291.833 88.1818C291.833 89.9119 291.058 91.1051 289.646 91.1051ZM298.2 92.1591C299.751 92.1591 300.885 91.3835 301.243 90.2301L300.109 89.9119C299.811 90.7074 299.12 91.1051 298.2 91.1051C296.823 91.1051 295.873 90.2152 295.819 88.5795H301.362V88.0824C301.362 85.2386 299.672 84.2642 298.081 84.2642C296.013 84.2642 294.641 85.8949 294.641 88.2415C294.641 90.5881 295.993 92.1591 298.2 92.1591ZM295.819 87.5653C295.898 86.3771 296.739 85.3182 298.081 85.3182C299.354 85.3182 300.169 86.2727 300.169 87.5653H295.819ZM303.517 84.3636H302.165L304.591 88.1818L302.165 92H303.517L305.346 89.0369L307.176 92H308.528L306.062 88.1818L308.528 84.3636H307.176L305.346 87.4858L303.517 84.3636ZM316.642 92.1591C318.71 92.1591 320.102 90.5881 320.102 88.2216C320.102 85.8352 318.71 84.2642 316.642 84.2642C314.574 84.2642 313.182 85.8352 313.182 88.2216C313.182 90.5881 314.574 92.1591 316.642 92.1591ZM316.642 91.1051C315.071 91.1051 314.355 89.7528 314.355 88.2216C314.355 86.6903 315.071 85.3182 316.642 85.3182C318.213 85.3182 318.929 86.6903 318.929 88.2216C318.929 89.7528 318.213 91.1051 316.642 91.1051ZM324.994 84.3636H323.284V83.5881C323.284 82.8324 323.602 82.4347 324.377 82.4347C324.716 82.4347 324.914 82.5142 325.034 82.554L325.372 81.5398C325.193 81.4602 324.835 81.3409 324.258 81.3409C323.164 81.3409 322.11 81.9972 322.11 83.3097V84.3636H320.877V85.358H322.11V92H323.284V85.358H324.994V84.3636ZM329.976 94.8636H331.149V90.8267H331.249C331.507 91.2443 332.004 92.1591 333.476 92.1591C335.385 92.1591 336.717 90.6278 336.717 88.2017C336.717 85.7955 335.385 84.2642 333.456 84.2642C331.964 84.2642 331.507 85.179 331.249 85.5767H331.109V84.3636H329.976V94.8636ZM331.129 88.1818C331.129 86.4716 331.885 85.3182 333.317 85.3182C334.808 85.3182 335.544 86.571 335.544 88.1818C335.544 89.8125 334.788 91.1051 333.317 91.1051C331.905 91.1051 331.129 89.9119 331.129 88.1818ZM341.309 92.1591C343.378 92.1591 344.77 90.5881 344.77 88.2216C344.77 85.8352 343.378 84.2642 341.309 84.2642C339.241 84.2642 337.849 85.8352 337.849 88.2216C337.849 90.5881 339.241 92.1591 341.309 92.1591ZM341.309 91.1051C339.738 91.1051 339.022 89.7528 339.022 88.2216C339.022 86.6903 339.738 85.3182 341.309 85.3182C342.88 85.3182 343.596 86.6903 343.596 88.2216C343.596 89.7528 342.88 91.1051 341.309 91.1051ZM347.434 81.8182H346.261V92H347.434V81.8182ZM349.283 92H350.456V84.3636H349.283V92ZM349.879 83.0909C350.337 83.0909 350.715 82.733 350.715 82.2955C350.715 81.858 350.337 81.5 349.879 81.5C349.422 81.5 349.044 81.858 349.044 82.2955C349.044 82.733 349.422 83.0909 349.879 83.0909ZM355.407 92.1591C357.098 92.1591 358.211 91.125 358.41 89.7727H357.237C357.018 90.608 356.322 91.1051 355.407 91.1051C354.015 91.1051 353.12 89.9517 353.12 88.1818C353.12 86.4517 354.035 85.3182 355.407 85.3182C356.441 85.3182 357.058 85.9545 357.237 86.6506H358.41C358.211 85.2188 356.998 84.2642 355.387 84.2642C353.319 84.2642 351.947 85.8949 351.947 88.2216C351.947 90.5085 353.26 92.1591 355.407 92.1591ZM363.027 92.1591C364.578 92.1591 365.712 91.3835 366.07 90.2301L364.936 89.9119C364.638 90.7074 363.947 91.1051 363.027 91.1051C361.65 91.1051 360.7 90.2152 360.646 88.5795H366.189V88.0824C366.189 85.2386 364.499 84.2642 362.908 84.2642C360.84 84.2642 359.467 85.8949 359.467 88.2415C359.467 90.5881 360.82 92.1591 363.027 92.1591ZM360.646 87.5653C360.725 86.3771 361.565 85.3182 362.908 85.3182C364.181 85.3182 364.996 86.2727 364.996 87.5653H360.646ZM371.311 92H372.485V84.3636H371.311V92ZM371.908 83.0909C372.365 83.0909 372.743 82.733 372.743 82.2955C372.743 81.858 372.365 81.5 371.908 81.5C371.451 81.5 371.073 81.858 371.073 82.2955C371.073 82.733 371.451 83.0909 371.908 83.0909ZM375.507 87.4062C375.507 86.0739 376.332 85.3182 377.456 85.3182C378.545 85.3182 379.206 86.0291 379.206 87.2273V92H380.379V87.1477C380.379 85.1989 379.34 84.2642 377.794 84.2642C376.64 84.2642 375.925 84.7812 375.567 85.5568H375.467V84.3636H374.334V92H375.507V87.4062ZM385.325 92.1591C387.016 92.1591 388.129 91.125 388.328 89.7727H387.155C386.936 90.608 386.24 91.1051 385.325 91.1051C383.933 91.1051 383.038 89.9517 383.038 88.1818C383.038 86.4517 383.953 85.3182 385.325 85.3182C386.359 85.3182 386.976 85.9545 387.155 86.6506H388.328C388.129 85.2188 386.916 84.2642 385.305 84.2642C383.237 84.2642 381.865 85.8949 381.865 88.2216C381.865 90.5085 383.178 92.1591 385.325 92.1591ZM389.743 92H390.917V84.3636H389.743V92ZM390.34 83.0909C390.797 83.0909 391.175 82.733 391.175 82.2955C391.175 81.858 390.797 81.5 390.34 81.5C389.883 81.5 389.505 81.858 389.505 82.2955C389.505 82.733 389.883 83.0909 390.34 83.0909ZM395.649 92.1591C397.121 92.1591 397.618 91.2443 397.876 90.8267H398.016V92H399.149V81.8182H397.976V85.5767H397.876C397.618 85.179 397.161 84.2642 395.669 84.2642C393.74 84.2642 392.408 85.7955 392.408 88.2017C392.408 90.6278 393.74 92.1591 395.649 92.1591ZM395.808 91.1051C394.337 91.1051 393.581 89.8125 393.581 88.1818C393.581 86.571 394.317 85.3182 395.808 85.3182C397.24 85.3182 397.996 86.4716 397.996 88.1818C397.996 89.9119 397.22 91.1051 395.808 91.1051ZM404.363 92.1591C405.914 92.1591 407.047 91.3835 407.405 90.2301L406.272 89.9119C405.973 90.7074 405.282 91.1051 404.363 91.1051C402.986 91.1051 402.036 90.2152 401.981 88.5795H407.525V88.0824C407.525 85.2386 405.834 84.2642 404.243 84.2642C402.175 84.2642 400.803 85.8949 400.803 88.2415C400.803 90.5881 402.155 92.1591 404.363 92.1591ZM401.981 87.5653C402.061 86.3771 402.901 85.3182 404.243 85.3182C405.516 85.3182 406.331 86.2727 406.331 87.5653H401.981ZM410.183 87.4062C410.183 86.0739 411.008 85.3182 412.132 85.3182C413.22 85.3182 413.882 86.0291 413.882 87.2273V92H415.055V87.1477C415.055 85.1989 414.016 84.2642 412.47 84.2642C411.316 84.2642 410.6 84.7812 410.242 85.5568H410.143V84.3636H409.009V92H410.183V87.4062ZM420.22 84.3636H418.589V82.5341H417.416V84.3636H416.262V85.358H417.416V90.1307C417.416 91.4631 418.49 92.0994 419.484 92.0994C419.922 92.0994 420.2 92.0199 420.359 91.9602L420.12 90.9062C420.021 90.9261 419.862 90.9659 419.603 90.9659C419.086 90.9659 418.589 90.8068 418.589 89.8125V85.358H420.22V84.3636ZM426.957 86.0739C426.589 84.9901 425.764 84.2642 424.253 84.2642C422.642 84.2642 421.449 85.179 421.449 86.4716C421.449 87.5256 422.075 88.2315 423.477 88.5597L424.75 88.858C425.52 89.0369 425.883 89.4048 425.883 89.9318C425.883 90.5881 425.187 91.125 424.094 91.125C423.134 91.125 422.532 90.7124 422.324 89.892L421.21 90.1705C421.483 91.468 422.552 92.1591 424.113 92.1591C425.888 92.1591 427.096 91.1896 427.096 89.8722C427.096 88.8082 426.43 88.1371 425.068 87.804L423.934 87.5256C423.03 87.3018 422.622 86.9986 422.622 86.4119C422.622 85.7557 423.318 85.2784 424.253 85.2784C425.277 85.2784 425.699 85.8452 425.903 86.3722L426.957 86.0739Z" fill="black" />
                <circle cx="857.5" cy="73.5" r="26" fill="#303463" stroke="#303463" strokeWidth="3" />
                <path d="M843.541 70.8622H844.811C844.773 69.4645 843.537 68.4503 841.764 68.4503C840.013 68.4503 838.67 69.4517 838.67 70.956C838.67 72.1705 839.54 72.8821 840.942 73.2614L841.973 73.5426C842.906 73.7898 843.626 74.0966 843.626 74.8722C843.626 75.7244 842.812 76.2869 841.692 76.2869C840.677 76.2869 839.834 75.8352 839.757 74.8849H838.436C838.521 76.4659 839.744 77.4418 841.7 77.4418C843.75 77.4418 844.93 76.3636 844.93 74.8849C844.93 73.3125 843.528 72.7031 842.42 72.4304L841.568 72.2088C840.886 72.0341 839.979 71.7145 839.983 70.8793C839.983 70.1378 840.66 69.5881 841.734 69.5881C842.736 69.5881 843.447 70.0568 843.541 70.8622ZM848.922 77.429C850.35 77.429 851.36 76.7259 851.65 75.6605L850.444 75.4432C850.214 76.0611 849.66 76.3764 848.935 76.3764C847.844 76.3764 847.111 75.669 847.077 74.4077H851.731V73.956C851.731 71.5909 850.316 70.6662 848.833 70.6662C847.009 70.6662 845.807 72.0554 845.807 74.0668C845.807 76.0994 846.992 77.429 848.922 77.429ZM847.082 73.4531C847.133 72.5241 847.806 71.7188 848.842 71.7188C849.83 71.7188 850.478 72.4517 850.482 73.4531H847.082ZM854.749 77.4418C855.832 77.4418 856.441 76.892 856.684 76.402H856.735V77.2969H857.979V72.9503C857.979 71.0455 856.479 70.6662 855.44 70.6662C854.255 70.6662 853.164 71.1435 852.738 72.3366L853.935 72.6094C854.123 72.1449 854.6 71.6974 855.457 71.6974C856.279 71.6974 856.701 72.1278 856.701 72.8693V72.8991C856.701 73.3636 856.224 73.3551 855.048 73.4915C853.807 73.6364 852.538 73.9602 852.538 75.4474C852.538 76.7344 853.505 77.4418 854.749 77.4418ZM855.026 76.419C854.306 76.419 853.786 76.0952 853.786 75.4645C853.786 74.7827 854.391 74.5398 855.129 74.4418C855.542 74.3864 856.522 74.2756 856.705 74.0923V74.9361C856.705 75.7116 856.087 76.419 855.026 76.419ZM859.376 77.2969H860.651V73.2997C860.651 72.4432 861.311 71.8253 862.215 71.8253C862.479 71.8253 862.777 71.8722 862.879 71.902V70.6832C862.751 70.6662 862.5 70.6534 862.338 70.6534C861.571 70.6534 860.915 71.0881 860.676 71.7912H860.608V70.7514H859.376V77.2969ZM866.205 77.429C867.752 77.429 868.753 76.5 868.894 75.2259H867.654C867.492 75.9332 866.942 76.3509 866.213 76.3509C865.135 76.3509 864.44 75.4517 864.44 74.0241C864.44 72.6222 865.148 71.7401 866.213 71.7401C867.023 71.7401 867.517 72.2514 867.654 72.8651H868.894C868.757 71.544 867.679 70.6662 866.192 70.6662C864.347 70.6662 863.154 72.0554 863.154 74.054C863.154 76.027 864.304 77.429 866.205 77.429ZM871.23 73.4105C871.23 72.3665 871.891 71.7699 872.798 71.7699C873.676 71.7699 874.2 72.3281 874.2 73.2869V77.2969H875.475V73.1335C875.475 71.5014 874.58 70.6662 873.233 70.6662C872.215 70.6662 871.601 71.1094 871.294 71.8168H871.213V68.5696H869.956V77.2969H871.23V73.4105Z" fill="white" />
                <circle cx="956.5" cy="73.5" r="26" fill="#669CC9" stroke="#303463" strokeWidth="3" />
                <path d="M948.54 62.5696V71.2969H949.793V64.9773H949.874L952.448 71.2841H953.488L956.061 64.9815H956.142V71.2969H957.395V62.5696H955.797L953.019 69.3537H952.916L950.138 62.5696H948.54ZM959.713 73.7514C960.765 73.7514 961.43 73.2017 961.809 72.1705L964.515 64.7642L963.139 64.7514L961.481 69.831H961.413L959.755 64.7514H958.392L960.787 71.3821L960.629 71.8168C960.305 72.6861 959.849 72.7585 959.15 72.5668L958.843 73.6108C958.997 73.679 959.329 73.7514 959.713 73.7514ZM939.566 83.2969H940.883V80.2287H942.672C944.697 80.2287 945.698 79.0057 945.698 77.3949C945.698 75.7884 944.705 74.5696 942.677 74.5696H939.566V83.2969ZM940.883 79.1122V75.6989H942.536C943.84 75.6989 944.373 76.4062 944.373 77.3949C944.373 78.3835 943.84 79.1122 942.553 79.1122H940.883ZM946.839 83.2969H948.113V79.2997C948.113 78.4432 948.774 77.8253 949.677 77.8253C949.942 77.8253 950.24 77.8722 950.342 77.902V76.6832C950.214 76.6662 949.963 76.6534 949.801 76.6534C949.034 76.6534 948.378 77.0881 948.139 77.7912H948.071V76.7514H946.839V83.2969ZM953.668 83.429C955.513 83.429 956.719 82.0781 956.719 80.054C956.719 78.017 955.513 76.6662 953.668 76.6662C951.822 76.6662 950.616 78.017 950.616 80.054C950.616 82.0781 951.822 83.429 953.668 83.429ZM953.672 82.3594C952.466 82.3594 951.903 81.3068 951.903 80.0497C951.903 78.7969 952.466 77.7315 953.672 77.7315C954.869 77.7315 955.432 78.7969 955.432 80.0497C955.432 81.3068 954.869 82.3594 953.672 82.3594ZM960.956 76.7514H959.545V76.1634C959.545 75.5838 959.784 75.2685 960.406 75.2685C960.67 75.2685 960.858 75.3281 960.977 75.3665L961.276 74.3352C961.097 74.267 960.726 74.1605 960.21 74.1605C959.175 74.1605 958.267 74.7656 958.267 75.9929V76.7514H957.257V77.7741H958.267V83.2969H959.545V77.7741H960.956V76.7514ZM961.971 83.2969H963.245V76.7514H961.971V83.2969ZM962.614 75.7415C963.053 75.7415 963.419 75.4006 963.419 74.983C963.419 74.5653 963.053 74.2202 962.614 74.2202C962.171 74.2202 961.809 74.5653 961.809 74.983C961.809 75.4006 962.171 75.7415 962.614 75.7415ZM965.933 74.5696H964.659V83.2969H965.933V74.5696ZM970.168 83.429C971.596 83.429 972.606 82.7259 972.895 81.6605L971.689 81.4432C971.459 82.0611 970.905 82.3764 970.181 82.3764C969.09 82.3764 968.357 81.669 968.323 80.4077H972.976V79.956C972.976 77.5909 971.562 76.6662 970.079 76.6662C968.255 76.6662 967.053 78.0554 967.053 80.0668C967.053 82.0994 968.238 83.429 970.168 83.429ZM968.327 79.4531C968.378 78.5241 969.052 77.7188 970.087 77.7188C971.076 77.7188 971.724 78.4517 971.728 79.4531H968.327Z" fill="white" />
                <circle cx="1055.5" cy="73.5" r="26" fill="#669CC9" stroke="#303463" strokeWidth="3" />
                <path d="M1040.14 71.2969L1040.94 68.9872H1044.35L1045.15 71.2969H1046.55L1043.41 62.5696H1041.89L1038.75 71.2969H1040.14ZM1041.33 67.8793L1042.61 64.1548H1042.68L1043.97 67.8793H1041.33ZM1047.51 71.2969H1048.75V70.2784H1048.86C1049.09 70.696 1049.56 71.4247 1050.75 71.4247C1052.34 71.4247 1053.49 70.1548 1053.49 68.0369C1053.49 65.9148 1052.32 64.6662 1050.74 64.6662C1049.52 64.6662 1049.09 65.4077 1048.86 65.8125H1048.78V62.5696H1047.51V71.2969ZM1048.76 68.0241C1048.76 66.6562 1049.35 65.7486 1050.47 65.7486C1051.62 65.7486 1052.2 66.7244 1052.2 68.0241C1052.2 69.3366 1051.6 70.3381 1050.47 70.3381C1049.37 70.3381 1048.76 69.4006 1048.76 68.0241ZM1057.37 71.429C1059.22 71.429 1060.43 70.0781 1060.43 68.054C1060.43 66.017 1059.22 64.6662 1057.37 64.6662C1055.53 64.6662 1054.32 66.017 1054.32 68.054C1054.32 70.0781 1055.53 71.429 1057.37 71.429ZM1057.38 70.3594C1056.17 70.3594 1055.61 69.3068 1055.61 68.0497C1055.61 66.7969 1056.17 65.7315 1057.38 65.7315C1058.58 65.7315 1059.14 66.7969 1059.14 68.0497C1059.14 69.3068 1058.58 70.3594 1057.38 70.3594ZM1065.69 68.5824C1065.7 69.6946 1064.87 70.223 1064.16 70.223C1063.37 70.223 1062.82 69.652 1062.82 68.7614V64.7514H1061.55V68.9148C1061.55 70.5384 1062.44 71.3821 1063.7 71.3821C1064.68 71.3821 1065.35 70.8622 1065.65 70.1634H1065.72V71.2969H1066.97V64.7514H1065.69V68.5824ZM1071.44 64.7514H1070.1V63.1832H1068.82V64.7514H1067.87V65.7741H1068.82V69.6392C1068.82 70.8281 1069.73 71.4034 1070.73 71.3821C1071.14 71.3778 1071.41 71.3011 1071.56 71.2457L1071.33 70.1932C1071.24 70.2102 1071.09 70.2486 1070.88 70.2486C1070.47 70.2486 1070.1 70.1122 1070.1 69.375V65.7741H1071.44V64.7514ZM1054.15 74.5696V80.2031C1054.15 81.3878 1053.33 82.2401 1052 82.2401C1050.68 82.2401 1049.86 81.3878 1049.86 80.2031V74.5696H1048.54V80.3097C1048.54 82.142 1049.91 83.4418 1052 83.4418C1054.1 83.4418 1055.47 82.142 1055.47 80.3097V74.5696H1054.15ZM1061.89 78.3494C1061.62 77.331 1060.83 76.6662 1059.41 76.6662C1057.93 76.6662 1056.89 77.446 1056.89 78.6051C1056.89 79.5341 1057.45 80.152 1058.68 80.4247L1059.78 80.6676C1060.41 80.8082 1060.71 81.0895 1060.71 81.4986C1060.71 82.0057 1060.17 82.402 1059.33 82.402C1058.57 82.402 1058.08 82.0739 1057.93 81.4304L1056.69 81.6179C1056.91 82.777 1057.87 83.429 1059.34 83.429C1060.92 83.429 1062.02 82.5895 1062.02 81.4048C1062.02 80.4801 1061.43 79.9091 1060.23 79.6321L1059.19 79.3935C1058.47 79.223 1058.16 78.9801 1058.16 78.5369C1058.16 78.0341 1058.7 77.6761 1059.43 77.6761C1060.22 77.6761 1060.58 78.1151 1060.73 78.554L1061.89 78.3494Z" fill="white" />
            </svg>
        </div>
    </div>

}