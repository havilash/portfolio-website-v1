import React from 'react'
import Block from '../components/Block'

export default function Impressum() {
  return (
    <div className='container flex justify-center items-center'>
        <Block title="Impressum" defaultOpenCloseState={true}>
          <div>
            <h2 className='mt-4'>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
            <p>Havilash Sivaratnam<br />
            Bachstrasse 2<br />
            3072 Ostermundigen</p>

            <h2 className='mt-4'>Kontakt</h2>
            <p>Telefon: +49 077 *** 20 22<br />
            E-Mail: hsi135609@stud.gibb.ch</p>
          </div>
        </Block>
    </div>
  )
}
