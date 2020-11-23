(function () {
  const califications = [];

  const onPostCalification = () => {
    document
      .getElementById("calification=form")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        const subject = document.getElementById("subject").value;
        const calification = document.getElementById("calification").value;

        const calificationValidated = validations.calificationValidation(
          calification
        );

        if (validations.subjectValidation(subject)) {
          alert("Inserte una materia");
          return;
        } else if (validations.calificationValidation(calification)) {
          alert(calificationValidated);
          return;
        }

        addCalification({ subject, calification });
      });
  };

  const validations = {
    subjectValidation: (subject) => subject.length === 0,
    calificationValidation: (calification) => {
      if (!calification.length) {
        return "Inserte una nota";
      } else if (isNaN(calification)) {
        return "La nota no es un numero";
      } else if (calification < 0 || calification > 5) {
        return "La nota debe ser entre 1 - 5";
      }
    },
  };

  const addCalification = ({ subject, calification }) => {
    if (califications.length) {
      const isRepeated = califications.find((calItem) => {
        if (calItem) {
          return calItem.subject === subject;
        }
      });
      if (isRepeated) {
        alert(`${subject} ya existe!`);
        return;
      }
    }

    califications.push({
      subject: subject,
      calification: calification,
    });

    const calificationBody = document.getElementById("calification-body");
    calificationBody.innerHTML = generateTable();
  };

  window.onRemoveCalification = (index) => {
    califications[index] = null;
    const calificationBody = document.getElementById("calification-body");
    calificationBody.innerHTML = generateTable();
  };

  const generateCalificationColor = (calification) => {
    if (calification <= 2.5) {
      return "text-danger";
    } else if (calification <= 2.9) {
      return "text-warning";
    }
    return "text-success";
  };

  const generateTable = () => {
    let result = "";
    let promedio = 0;
    let total = 0;
    califications.forEach((calification, index) => {
      if (calification) {
        total += 1;
        promedio += Number(calification.calification);
        result += `<tr>
                            <td>${calification.subject}</td>
                            <td class=${generateCalificationColor(
                              calification.calification
                            )}>${calification.calification}</td>
                            <td class="text-center" onClick="onRemoveCalification(${index})">
                                <i class="far fa-trash-alt text-danger"></i>
                            </td>
                        </tr>`;
      }
    });

    result += `<tr>
                  <td class="bg-dark text-white">Promedio</td>
                  <td class=${generateCalificationColor(promedio / total)}>${
      promedio / total
    }</td>
                 </tr>`;
    return result;
  };

  onPostCalification();
})();
