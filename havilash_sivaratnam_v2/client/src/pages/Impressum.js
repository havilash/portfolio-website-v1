import React from 'react'
import Block from '../components/Block'

export default function Impressum() {
  return (
    <div className='container flex justify-center items-center'>
        <Block title="Impressum" defaultOpenCloseState={true} openCloseAble={true}>
          <div>
            <h2 className='mt-4'>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
            <p>Max Mustermann<br />
            Musterstra&szlig;e 111<br />
            Geb&auml;ude 44<br />
            90210 Musterstadt</p>

            <h2 className='mt-4'>Kontakt</h2>
            <p>Telefon: +49 (0) 123 44 55 66<br />
            Telefax: +49 (0) 123 44 55 99<br />
            E-Mail: mustermann@musterfirma.de</p>
          </div>
        </Block>
    </div>
  )
}
