import { BiSpreadsheet, BiTrendingUp, BiStopwatch } from 'react-icons/bi';
import styled from 'styled-components';


function Overview() {
    return (
        <div>
            <div className="info-title">
                <BiSpreadsheet />
                <h3>Overview</h3>
            </div>
            <div className="info-card overview">
                <div className="container">
                    <div className="icon-bg">
                        <BiTrendingUp />
                    </div>
                    <div className="info-wrapper">
                        <p>Completed today</p>
                        {/* <p>{this.props.completedActivities} acticvity</p> */}
                    </div>
                </div>

                <div className="container">
                    <div className="icon-bg">
                        <BiStopwatch />
                    </div>
                    <div className="info-wrapper">
                        <p>Time left</p>
                        {/* <p> none{this.props.timeLeft}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;
