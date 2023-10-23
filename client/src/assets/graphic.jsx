import React, { useEffect } from "react";
import Highcharts from "highcharts";

const Graphic = ({ title }) => {
  const uniqueId2 = Math.random().toString(36).substring(7); // Gere um ID único aleatório

  const val1= Math.floor(Math.random() * 10) + 1;
  const val2= Math.floor(Math.random() * 10) + 1;
  const val3= Math.floor(Math.random() * 10) + 1;

  const chartContainerId = `chart-container-${uniqueId2}`; // Crie um ID único para o contêiner do gráfico

  useEffect(() => {
    // Configurar o gráfico Highcharts aqui
    const options = {
      chart: {
        type: "bar",
      },
      title: {
        text: "Exemplo de Gráfico Highcharts",
      },
      xAxis: {
        categories: ["Categoria 1", "Categoria 2", "Categoria 3"],
      },
      yAxis: {
        title: {
          text: "Valores",
        },
      },
      series: [
        {
          name: "Série 1",
          data: [1, 2, 3],
        },
      ],
    };

    // Renderizar o gráfico Highcharts no elemento com o ID único
    Highcharts.chart(chartContainerId, options);
  }, [chartContainerId]);

  return (
    <div className="graphic-container">
      <h1 className="txt">{title} - {uniqueId2}</h1>
      <h1 className="txt">{title} - {'1'}</h1>

      <div className="chart-container" id={chartContainerId}>
        {/* O gráfico Highcharts será renderizado aqui */}
      </div>
    </div>
  );
};

export default Graphic;
