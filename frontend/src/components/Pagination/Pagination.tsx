import React from 'react';
import { Pagination, Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { useParams, useLocation, Link } from 'react-router-dom';

interface PaginationProps {
    instancesPerPage: number,
    totalInstances: number,
    startingInstance: number,
    offsetPagesShownFromCurrent: number,
    setStartingInstance: Function,
    setInstancesPerPage: Function
  }

function Pagination_main(props: any) {

    const pageButtons = [];
    const totalPages = Math.ceil(props.totalInstances / props.instancesPerPage);
    const activePage = Math.floor(props.startingInstance/props.instancesPerPage + 1);
    if (activePage - props.offsetPagesShownFromCurrent > 0){
        pageButtons.push(<Pagination.Item onClick={() => props.setStartingInstance(0)}>{1}</Pagination.Item>)
        if (activePage - props.offsetPagesShownFromCurrent - 1 > 0){
            pageButtons.push(<Pagination.Ellipsis/>)
        }
    }
    for (let i = activePage - props.offsetPagesShownFromCurrent + 1; i <= props.startingInstance/props.instancesPerPage + props.offsetPagesShownFromCurrent; i++) {
        if(i > 0 && i < totalPages + 1){
            if(i === activePage){
                pageButtons.push(<Pagination.Item active>{i}</Pagination.Item>)
            }
            else{
                pageButtons.push(<Pagination.Item onClick={() => props.setStartingInstance((i-1) * props.instancesPerPage)}>{i}</Pagination.Item>)
            }
        }
    }
    if (activePage + props.offsetPagesShownFromCurrent < totalPages){
        if (activePage + props.offsetPagesShownFromCurrent - 1 < totalPages){
            pageButtons.push(<Pagination.Ellipsis/>)
        }
        pageButtons.push(<Pagination.Item onClick={() => props.setStartingInstance((totalPages - 1) * props.instancesPerPage)}>{totalPages}</Pagination.Item>)
        
    }

    return ( 
        <Row className="justify-content-md-center" style={{paddingTop: '1%'}}>
            <Col sm={8} md="auto">
                <Pagination>
                    <Pagination.First onClick={() => props.setStartingInstance(0)}/>
                    <Pagination.Prev onClick={() => props.setStartingInstance(Math.max(0, props.startingInstance - props.instancesPerPage))}/>
                    {pageButtons}
                    <Pagination.Next onClick={() => props.setStartingInstance(Math.min(((totalPages - 1) * props.instancesPerPage), props.startingInstance + props.instancesPerPage))}/>
                    <Pagination.Last onClick={() => props.setStartingInstance((totalPages - 1) * props.instancesPerPage)}/>
                </Pagination>
            </Col>
            <Col sm={3} lg="2">
                <ButtonGroup>
                    <Button variant="outline-primary" onClick={() => props.setInstancesPerPage(10)}>10</Button> 
                    <Button variant="outline-primary" onClick={() => props.setInstancesPerPage(20)}>20</Button> 
                    <Button variant="outline-primary" onClick={() => props.setInstancesPerPage(50)}>50</Button>
                </ButtonGroup>
            </Col>
        </Row>
    );
};

export default Pagination_main;