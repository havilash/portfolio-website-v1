import React from 'react'
import Block from '../components/Block'
import Skill from '../components/Skill'

export default function Skills() {
  return (
    <div className='container
    grid grid-cols-[repeat(auto-fit,_20rem)] gap-8
    justify-center content-start md:content-center items-center'>
        <Block className="w-full" 
        title="Frontend"
        openClose={false}>
          <Skill key='skill-1' name="HTML" percent="80" />
          <Skill key='skill-2' name="CSS" percent="80" />
          <Skill key='skill-3' name="JavaScript" percent="80" />
          <Skill key='skill-4' name="React" percent="80" />
          <Skill key='skill-5' name="Angular" percent="80" />
        </Block>

        <Block className="w-full" 
        title="Backend"
        openClose={false}> 
          <Skill key='skill-1' name="Python" percent="80" />
          <Skill key='skill-2' name="Java" percent="80" />
          <Skill key='skill-3' name="Node.js" percent="80" />
          <Skill key='skill-4' name="Spring Boot" percent="80" />
        </Block>

    </div>
  )
}
