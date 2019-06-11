import React, { Component } from 'react'
import { Header, Search, Button, Popup, Grid, List } from 'semantic-ui-react'

import ProjectMaterialList from "../Components/ProjectMaterialList"

class ProjectMaterials extends Component {

  state = {
    label: "",
    user_id: "",
    isOpen: false,
    material_id: '',
    all: []
  }


  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleClick = (id) => {
    console.log("project_id", this.props.id, "material", id);
    fetch('http://localhost:3001/api/v1/project_materials', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ project_id: this.props.id, material_id: id })
    })
      .then(res=>{res.json()})
      .then(data => {this.props.addProjectMaterial(data)})
      .then(()=>this.props.fetchProjectMaterials())

      this.setState({isOpen: false})


  }

  handleQuantity = () => {
    fetch(`http://localhost:3001/api/v1/projects/${this.props.id}`)
    .then(res => res.json())
    .then(data => {console.log(data)})
  }

  render (){

    const form = this.props.allMaterials.map(material => {
      return  (<List>
        <Button key={material.id} onClick={()=>this.handleClick(material.id)}>{material.label} ${material.price} ({material.quantity})</Button>
        </List>)
      })

    return (
      <>
        <Header inverted color='grey' textAlign="center" as='h2'>Inventory</Header>
        <center><Search width={15} onSearchChange={this.props.handleSearch} showNoResults={false} /></center><br />
        <Grid>
          <Grid.Column width={3}><span>Item:</span></Grid.Column>
          <Grid.Column width={3}><span>Price:</span></Grid.Column>
          <Grid.Column width={3}><span>Quantity:</span></Grid.Column>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={3}></Grid.Column>
        </Grid>
        {this.props.materials.map(material => (
          <ProjectMaterialList
            key={material.id}
            label={material.label}
            price={material.price}
            quantity={material.quantity}
            description={material.description}
            id={material.id}
            image_url={material.image_url}
            place_purchased={material.place_purchased}
            deleteMaterial={this.props.deleteMaterial}
            fetchMaterials={this.props.fetchMaterials}
            pm={this.props.pm}/>
        ))}<br />
        <center><center><Popup trigger={<Button content='Add A Material' />}
                  content={form}
                  on='click'
                  position='bottom right'
                  open={this.state.isOpen}
                  onOpen={this.handleOpen}
                  onClose={this.handleClose}
                  /></center></center>
      </>
    )
  }
}

export default ProjectMaterials
