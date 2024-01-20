import React, { useRef } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { Row, Col, Button } from 'antd'
import { MonitorOutlined, SearchOutlined } from '@ant-design/icons'

import styles from './styles.module.css'

export default function Navigator() {
    const parallax = useRef<IParallax>(null!)
    return (
        <div className={styles.container}>
            <Parallax ref={parallax} pages={4}>
                {/*Navigator's navbar*/}
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

                {/*Decorative elements*/}
                <ParallaxLayer offset={3.1} speed={1.4} style={{ opacity: 0.6, maxHeight: 10 }}>
                    <img src='https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png' style={{ display: 'block', width: '5%', marginLeft: '85%' }} />
                    <img src='https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png' style={{ display: 'block', width: '2.5%', marginLeft: '70%' }} />
                    <img src='https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png' style={{ display: 'block', width: '4%', marginLeft: '90%' }} />
                    <img src='https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png' style={{ display: 'block', width: '3.7%', marginLeft: '65%' }} />
                </ParallaxLayer>

                <ParallaxLayer offset={3.2} speed={2.4} style={{ opacity: 0.8, maxHeight: 10 }}>
                    <img src='https://www.freeiconspng.com/uploads/moon-icon-32.png' style={{ display: 'block', width: '10%', marginLeft: '75%' }} />
                </ParallaxLayer>

                {/*Background*/}
                <ParallaxLayer offset={0} speed={0.3} className={styles.dusk} />
                <ParallaxLayer offset={1} speed={0.3} className={styles.day} />
                <ParallaxLayer offset={2} speed={0.3} className={styles.dawn} />
                <ParallaxLayer offset={3} speed={0.3} className={styles.night} />

                {/*Page's main frame*/}
                <ParallaxLayer offset={0.2} speed={0.9} className={styles.sampleBox}>
                    Sample box
                </ParallaxLayer>
                <ParallaxLayer offset={1.2} speed={0.9} className={styles.sampleBox}>
                    Sample box
                </ParallaxLayer>
                <ParallaxLayer offset={2.2} speed={0.9} className={styles.sampleBox}>
                    Sample box
                </ParallaxLayer>
                <ParallaxLayer offset={3.2} speed={0.9} className={styles.sampleBox}>
                    Sample box
                </ParallaxLayer>

                {/*Typography and buttons*/}
                <ParallaxLayer offset={0.5} speed={1.1} className={styles.sampleText}>
                    <Row align="middle">
                        <Col span={24}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus in consequatur praesentium culpa iure perferendis iusto fugiat deleniti nihil error.
                        </Col>
                        <Col span={24} className={styles.sampleButton}>
                            <Button type="primary" onClick={() => parallax.current.scrollTo(1)}>Next</Button>
                        </Col>
                    </Row>
                </ParallaxLayer>
                <ParallaxLayer offset={1.5} speed={1.1} className={styles.sampleText}>
                    <Row align="middle">
                        <Col span={24}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus in consequatur praesentium culpa iure perferendis iusto fugiat deleniti nihil error.
                        </Col>
                        <Col span={24} className={styles.sampleButton}>
                            <Button type="primary" onClick={() => parallax.current.scrollTo(2)}>Next</Button>
                        </Col>
                    </Row>
                </ParallaxLayer>
                <ParallaxLayer offset={2.5} speed={1.1} className={styles.sampleText}>
                    <Row align="middle">
                        <Col span={24}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus in consequatur praesentium culpa iure perferendis iusto fugiat deleniti nihil error.
                        </Col>
                        <Col span={24} className={styles.sampleButton}>
                            <Button type="primary" onClick={() => parallax.current.scrollTo(3)}>Next</Button>
                        </Col>
                    </Row>
                </ParallaxLayer>
                <ParallaxLayer offset={3.5} speed={1.1} className={styles.sampleText}>
                    <Row align="middle">
                        <Col span={24}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus in consequatur praesentium culpa iure perferendis iusto fugiat deleniti nihil error.
                        </Col>
                        <Col span={24} className={styles.sampleButton}>
                            <Button type="primary" onClick={() => parallax.current.scrollTo(0)}>Back to top</Button>
                        </Col>
                    </Row>
                </ParallaxLayer>

                {/*Navigate*/}
            </Parallax>
        </div>
    )
}
