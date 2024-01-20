import React, { useRef } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { Row, Col, Button } from 'antd'
import { MonitorOutlined, SearchOutlined } from '@ant-design/icons'

import styles from './styles.module.css'

export default function Navigator() {
    const parallax = useRef<IParallax>(null!)
    return (
        <Parallax ref={parallax} pages={4} className={styles.container}>
            <ParallaxLayer offset={0} sticky={{ start: 0, end: 4 }} className={styles.navbar}>
                <Row>
                    <Col span={20}>
                        <h4>ART ATTACK</h4>
                    </Col>
                    <Col span={4} className={styles.buttons}>
                        <Button type='default' shape='circle' icon={<MonitorOutlined />} />
                        <Button type='default' icon={<SearchOutlined />} />
                    </Col>
                </Row>
            </ParallaxLayer>
            {/*Decoration*/}
            <ParallaxLayer offset={3.1} speed={0.16} style={{ opacity: 0.6, maxHeight: 10 }}>
                <img src='https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png' style={{ display: 'block', width: '5%', marginLeft: '85%' }} />
                <img src='https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png' style={{ display: 'block', width: '2.5%', marginLeft: '70%' }} />
                <img src='https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png' style={{ display: 'block', width: '4%', marginLeft: '90%' }} />
                <img src='https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png' style={{ display: 'block', width: '3.7%', marginLeft: '65%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={3.2} speed={0.1} style={{ opacity: 0.8, maxHeight: 10 }}>
                <img src='https://www.freeiconspng.com/uploads/moon-icon-32.png' style={{ display: 'block', width: '10%', marginLeft: '75%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={0} speed={0.3} className={styles.dusk}>
                <div className={styles.sampleBox}>Sample Box</div>
                <div className={styles.sampleText}>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam maxime corrupti ducimus praesentium perferendis cum corporis, et est molestiae, distinctio debitis? Cumque recusandae dolorem, doloribus repellat ab tempora placeat tenetur ipsa deserunt distinctio non sunt voluptatum quia est tempore, doloremque quaerat mollitia. Fuga accusamus odio explicabo corrupti aliquam tempora earum?</p>
                    <div className={styles.sampleButton}>
                        <Button type="primary" onClick={() => { parallax.current.scrollTo(1); console.log("Clicked") }}>Next</Button>
                    </div>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.3} className={styles.day}>
                <div className={styles.sampleBox}>Sample Box</div>
                <div className={styles.sampleText}>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam maxime corrupti ducimus praesentium perferendis cum corporis, et est molestiae, distinctio debitis? Cumque recusandae dolorem, doloribus repellat ab tempora placeat tenetur ipsa deserunt distinctio non sunt voluptatum quia est tempore, doloremque quaerat mollitia. Fuga accusamus odio explicabo corrupti aliquam tempora earum?</p>
                    <div className={styles.sampleButton}>
                        <Button type="primary" onClick={() => { parallax.current.scrollTo(2); console.log("Clicked") }}>Next</Button>
                    </div>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={2} speed={0.3} className={styles.dawn}>
                <div className={styles.sampleBox}>Sample Box</div>
                <div className={styles.sampleText}>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam maxime corrupti ducimus praesentium perferendis cum corporis, et est molestiae, distinctio debitis? Cumque recusandae dolorem, doloribus repellat ab tempora placeat tenetur ipsa deserunt distinctio non sunt voluptatum quia est tempore, doloremque quaerat mollitia. Fuga accusamus odio explicabo corrupti aliquam tempora earum?</p>
                    <div className={styles.sampleButton}>
                        <Button type="primary" onClick={() => { parallax.current.scrollTo(3); console.log("Clicked") }}>Next</Button>
                    </div>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={3} speed={0.3} className={styles.night}>
                <div className={styles.sampleBox}>Sample Box</div>
                <div className={styles.sampleText}>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam maxime corrupti ducimus praesentium perferendis cum corporis, et est molestiae, distinctio debitis? Cumque recusandae dolorem, doloribus repellat ab tempora placeat tenetur ipsa deserunt distinctio non sunt voluptatum quia est tempore, doloremque quaerat mollitia. Fuga accusamus odio explicabo corrupti aliquam tempora earum?</p>
                    <div className={styles.sampleButton}>
                        <Button type="primary" onClick={() => { parallax.current.scrollTo(0); console.log("Clicked") }}>Back to top</Button>
                    </div>
                </div>
            </ParallaxLayer>

            {/*Navigate*/}
        </Parallax>
    )
}
