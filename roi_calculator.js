$(document).ready(function() {
        console.log('foo');
        $('#roi-container input').on('change', function() {

            var census = parseInt($("#Avg_Daily_Census").val());
            var avg_wound_cost = parseInt($("#Avg_Wound_Cost").val());
            var avg_rn_visits = parseInt($("#Avg_RN_Visits").val());
            var avg_salary = parseFloat($("#Avg_Annual_Salary").val());

            var ann_admissions = (census  / 60) * 365;
            var annual_corstrata = (census * 8) * 12;
            var num_patients = ann_admissions * .3;
            var avg_visits = avg_rn_visits / 8;
            var avg_rn_salary = avg_salary * 1.2;
            var baseline = num_patients * avg_rn_visits;
            var reduct_visits = baseline * .2;
            var cost_per_visit = (avg_rn_salary / 280 / 6) + 5;
            var ann_supply = (avg_wound_cost * .3) * 12;
            var ann_cost_savings = reduct_visits * cost_per_visit;

            $('#Annual_Corstrata').text(formatMoney(Math.round(annual_corstrata.toFixed(2))));
            $('#Annual_Supply').text(formatMoney(Math.round(ann_supply.toFixed(2))));
            $('#cost_per_visit').text(formatMoney(Math.round(cost_per_visit.toFixed(2))));
            $('#Baseline_Visits').text(Math.round((isNaN(baseline) ? 0 : baseline), 2));
            $('#Reduct_Visits').text(Math.round((isNaN(reduct_visits) ? 0 : reduct_visits), 2));
            $('#Annual_Cost_Savings').text(formatMoney(Math.round(ann_cost_savings.toFixed(2))));

          
            var annual_savings = Math.round(ann_supply + ann_cost_savings);
            $('#A10').text("+ $" + formatMoney((isNaN(annual_savings) ? 0 : annual_savings), 2));
            var annual_net = Math.round(annual_savings - annual_corstrata);
            $('#D10').text("+ $" + formatMoney((isNaN(annual_net) ? 0 : annual_net), 2));
            var roi = Math.round((annual_net / annual_corstrata) * 100);
            $('#B13').text("+ %" + formatMoney((isNaN(roi) ? 0 : roi), 2));
        });

        function formatMoney(n, c, d, t) {
            c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "." : d, t = t == undefined ? "," : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        };

    function unformat(n) {
      return parseFloat(n.replace(/,/g, ''));
    }
        $('input').on('blur', function() {
            $(this).trigger('change');
        });
        $('#Avg_Daily_Census').number(true);
        $('#Avg_Wound_Cost').number(true);
        $('#Avg_RN_Visits').number(true, 2);
        $('#Avg_Annual_Salary').number(true, 2);
    });

  function generatePDF(a) {
    var doc = new jsPDF();
    var logo = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMzaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzMiA3OS4xNTkyODQsIDIwMTYvMDQvMTktMTM6MTM6NDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1LjUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTJCOTE4QzQ1Q0Q3MTFFNkFFNjdFOTYyNjFCMjA2RTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTJCOTE4QzU1Q0Q3MTFFNkFFNjdFOTYyNjFCMjA2RTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDMzY0QjgxMzVDOEYxMUU2QUU2N0U5NjI2MUIyMDZFNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMzY0QjgxNDVDOEYxMUU2QUU2N0U5NjI2MUIyMDZFNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAYEBAQFBAYFBQYJ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";
    doc.addImage(logo, 'JPEG', 153, 5);
    doc.setFontSize(24);
    doc.text(60, 30, "Current Website Metrics");
    doc.setDrawColor(16, 130, 193);
    doc.setFontSize(14);
    y = 35;
    doc.line(15, y, 195, y);
    y = y + 10;
    doc.text(20, y - 3, "Website");
    doc.line(15, y, 195, y);
    y = y + 10;
    doc.text(20, y - 3, "Average Daily Census");
    doc.text(120, y - 3, $.number($("#Avg_Daily_Census").val()));
    doc.line(15, y, 195, y);
    y = y + 10;
    doc.text(20, y - 3, "Average Monthly Wound Supply Cost");
    doc.text(120, y - 3, $.number($("#Avg_Wound_Cost").val()));
    doc.line(15, y, 195, y);
    y = y + 10;
    doc.text(20, y - 3, "Average RN Visits Per Episode Per Wound Patient");
    doc.text(120, y - 3, $.number($("#Avg_RN_Visits").val()) + "%");
    doc.line(15, y, 195, y);
    y = y + 10;
    doc.text(20, y - 3, "Annual Average Home Care RN Salary");
    doc.text(120, y - 3, $.number($("#Avg_Annual_Salary").val()) + "%");
    doc.line(15, y, 195, y);
    y = y + 10;
    doc.line(15, 35, 15, 95);
    doc.line(195, 35, 195, 95);
    doc.setFontSize(12);
    doc.setDrawColor(200);
    doc.setFillColor(250);
    doc.roundedRect(40, 100, 60, 25, 2, 2, 'FD');
    doc.roundedRect(110, 100, 60, 25, 2, 2, 'FD');
    doc.roundedRect(40, 132, 60, 25, 2, 2, 'FD');
    doc.roundedRect(110, 132, 60, 25, 2, 2, 'FD');
    doc.text(48, 120, "Your Conversion Rate");
    doc.text(114, 120, "Avg. Qualified Leads/Month");
    doc.text(45, 153, "Avg. New Customers/Month");
    doc.text(121, 153, "Gross Profit/Month");
    doc.setFontSize(20);
    doc.setTextColor(40, 151, 203);
    doc.text(50, 112, $("#Baseline_Visits").text() + "%");
    doc.text(120, 112, $("#Annual_Corstrata").text());
    doc.text(50, 145, $("#Reduct_Visits").text());
    doc.text(120, 145, "$" + $("#Annual_Supply").text());
    doc.line(15, 165, 195, 165);
    doc.setTextColor(0);
    doc.text(65, 178, "Revenue Growth Potential");
    doc.setDrawColor(16, 130, 193);
    doc.setFillColor(16, 130, 193);
    doc.roundedRect(15, 190, 58, 25, 2, 2, 'FD');
    doc.roundedRect(78, 190, 58, 25, 2, 2, 'FD');
    doc.roundedRect(140, 190, 58, 25, 2, 2, 'FD');
    doc.setTextColor(255);
    doc.text(22, 202, $("#A10").text());
    doc.text(82, 202, $("#D10").text());
    doc.text(144, 202, $("#B13").text());
    doc.setFontSize(9.5);
    doc.text(17, 208, "With 1% Increase in Conversion Rate");
    doc.text(79, 208, "With 30% Increase in Website Traffic");
    doc.text(141, 208, "With 1% Increase in Conversion Rate \n        & 30% in Website Traffic");
    if (a) doc.save('Inbound Revenue Calculations.pdf');
    else return doc.output('datauristring');
}