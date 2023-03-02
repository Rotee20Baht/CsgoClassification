import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router';

class UpdateProducts extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        product_id: props.match.params.product_id,
        title: '',
        image_url: '',
        description: '',
        price: 0,
        redirect: null
      }
    }

    componentDidMount(){
      axios.get('http://localhost:8081/admin/edit-products/'+this.state.product_id).then(res => {
        let data = res.data.data[0];
        console.log(data);
        this.setState({
          title: data.title,
          image_url: data.image_url,
          description: data.description,
          price: data.price
        });
      }).catch(error => {
        console.log(error);
      });
    }

    handleChange = (e) => {
      console.log(e.target.name, e.target.value);
      let name = e.target.name;
      let value = e.target.value;
      this.setState({
        [name]: value
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8081/admin/edit-products', this.state).then(res => {
        console.log(res.data);
        if(res.data.result){
          this.setState({redirect: '/products'});
        }
      }).catch(error => {
        console.log(error);
      });
    }
    
    render(){
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
        return(
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6">
                    <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label>ชื่อสินค้า</label>
                        <input type="text" name="title" class="form-control" placeholder="ชื่อสินค้า" onChange={this.handleChange} value={this.state.title} />
                    </div>
                    <div class="form-group">
                        <label>รายละเอียด</label>
                        <input type="text" name="description" class="form-control" placeholder="รายละเอียด" onChange={this.handleChange} value={this.state.description} />
                    </div>
                    <div class="form-group">
                        <label>ที่อยู่รูปภาพ</label>
                        <input type="text" name="image_url" class="form-control" placeholder="ที่อยู่รูปภาพ" onChange={this.handleChange} value={this.state.image_url}/>
                    </div>
                    <div class="form-group">
                        <label>ราคา</label>
                        <input type="text" name="price" class="form-control" placeholder="ราคา" onChange={this.handleChange} value={this.state.price}/>
                    </div>
                    <button type="submit" class="btn btn-primary">บันทึก</button>
                    </form>
                    <br />
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateProducts;