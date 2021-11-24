import './styles.scss';

type Props = {
    seg: boolean;
    segPeriod: string;
    ter: boolean;
    terPeriod: string;
    qua: boolean;
    quaPeriod: string;
    qui: boolean;
    quiPeriod: string;
    sex: boolean;
    sexPeriod: string;
    sab: boolean;
    sabPeriod: string;
}

const HealthProOfficeHours = ({ seg, segPeriod, ter, terPeriod, qua, quaPeriod, qui, quiPeriod, sex, sexPeriod, sab, sabPeriod }: Props) => {

    return(
        <>
         <table className="table hp-form-table">
                <tr>
                  <th>Dia da Semana</th>
                  <th>Atende?</th>
                  <th>Período</th>
                </tr>
                <tr>
                  <td>
                    <label>Segunda</label>
                  </td>
                  <td><span>{seg.toString()}</span></td>
                  <td><span>{segPeriod}</span></td>
                </tr>
                <tr>
                  <td>
                    <label>Terça</label>
                  </td>
                  <td><span>{ter.toString()}</span></td>
                  <td><span>{terPeriod}</span></td>
                </tr>
                <tr>
                  <td>
                    <label>Quarta</label>
                  </td>
                  <td><span>{qua.toString()}</span></td>
                  <td><span>{quaPeriod}</span></td>
                </tr>
                <tr>
                  <td>
                    <label>Quinta</label>
                  </td>
                  <td><span>{qui.toString()}</span></td>
                  <td><span>{quiPeriod}</span></td>
                </tr>
                <tr>
                  <td>
                    <label>Sexta</label>
                  </td>
                  <td><span>{sex.toString()}</span></td>
                  <td><span>{sexPeriod}</span></td>
                </tr>
                <tr>
                  <td>
                    <label>Sábado</label>
                  </td>
                  <td><span>{sab.toString()}</span></td>
                  <td><span>{sabPeriod}</span></td>
                </tr>
              </table>
        </>
    );
}

export default HealthProOfficeHours;