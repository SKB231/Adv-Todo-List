import React, { Component, useState } from 'react';

function TodoCategories(props) {

    const [input, setInput] = useState('');


    const textChangeHandle = e =>
    {
        setInput( oldVal => e.target.value);
    }

    const addNewCategory = v =>
    {
        v.preventDefault();

        let names = props.categories.map(category => (category.name));

        let current = input;

        if( current == '')
        {
            return;
        }

        if(current =='None')
        {
            current += '_copy';
        }
        let index = 0;
        while(names.includes(current))
        {
            index++;
            if(index > 1)
            {
                alert('Category Name contains too many repetitions. Please enter a unique Name');
                return;
            }
            current += '_copy';
        }



        let newCategory = 
        {
            id: Math.floor(Math.random()*10000 + 1),
            name: current
        };

        let oldCat = [newCategory,...props.categories];
        props.changeCategories(oldCat);
        setInput('');
    }

    return ( 
        <div className='todo-categories'>
            <form onSubmit={addNewCategory}>
                <input 
                    onChange={textChangeHandle}
                    className='category-input'
                    type='text'
                    placeholder='New Category'
                    value={input}/>
            </form>

            <div className='categoryList'>
                <div id='None' className='Category' onClick={()=>props.handleClickCategory('None')} >None</div>
            {
                props.categories.map(v=><div id={v.name} className='Category' onClick={()=>props.handleClickCategory(v.name)} key={v.id} >{v.name}</div>)
            }
            </div>
        </div>
     );
}

export default TodoCategories;