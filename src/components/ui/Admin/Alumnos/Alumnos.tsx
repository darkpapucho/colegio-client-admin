import { useState } from 'react';
import Widget from '../../../shared/Widget/Widget';
import { Container } from '../../../shared/Container';

export default function Alumnos() {
  const [selected, setSelected] = useState('reportar-tardanzas');
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelected(event.target!.id);
  }
  return (
    <Container $bgColor="#40409f" $width="100%">
      <Widget numberTabs={3}>
        <Widget.Tabs>
          <input type="radio" name="tabs" id="reportar-tardanzas" checked={selected === 'reportar-tardanzas'} onChange={(event) => handleChange(event)} />
          <label htmlFor="reportar-tardanzas">Reportar tardanzas</label>

          <input type="radio" name="tabs" id="justificar-tardanzas" checked={selected === 'justificar-tardanzas'} onChange={handleChange} />
          <label htmlFor="justificar-tardanzas">Justificar tardanzas</label>

          <input type="radio" name="tabs" id="justificar-inasistencias" checked={selected === 'justificar-inasistencias'} onChange={handleChange}></input>
          <label htmlFor="justificar-inasistencias">justificar inasistencias</label>
        </Widget.Tabs>
        <Widget.Content>
          <Widget.Content.Item index={1}>
            <h2>Overview1</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, ad eum! Vero asperiores nostrum voluptatum libero blanditiis consectetur vitae nihil facere, nemo
              error iste voluptas incidunt cumque atque tempore soluta?
            </p>
          </Widget.Content.Item>
          <Widget.Content.Item index={2}>
            <h2>Overview2</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, ad eum! Vero asperiores nostrum voluptatum libero blanditiis consectetur vitae nihil facere, nemo
              error iste voluptas incidunt cumque atque tempore soluta?
            </p>
          </Widget.Content.Item>
          <Widget.Content.Item index={3}>
            <h2>Overview3</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, ad eum! Vero asperiores nostrum voluptatum libero blanditiis consectetur vitae nihil facere, nemo
              error iste voluptas incidunt cumque atque tempore soluta?
            </p>
          </Widget.Content.Item>
        </Widget.Content>
      </Widget>
    </Container>
  );
}
