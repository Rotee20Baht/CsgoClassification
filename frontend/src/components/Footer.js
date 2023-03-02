import React from 'react';
import './Footer.css';

class Footer extends React.Component {

    render(){
        return(
            <footer id="tempaltemo_footer" className="bg">


                <div className="w-100 bg-black py-3">
                    <div className="container">
                        <div className="row pt-2">
                            <div className="col-12">
                                <p className="text-left text-light">
                                    Copyright &copy; 2021 Company Name 
                                    | Designed by <a rel="sponsored" href="https://templatemo.com" target="_blank">TemplateMo</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        );
    }
}

export default Footer;