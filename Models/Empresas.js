const empresa = require("./Empresa")

    class empresas {

        constructor() {
            this.listaempresas = [];
        }

        //agrego una nueva empresa a la lista de empresa
        agregarempresa (empre = new empresa()) {
            this.listaempresas.push(empre);
        }

        //obtener todo el listado de empresas
        obtenerempresa () {
            return this.listaempresas;
        }

        borrarempresa (id = '') {
            //filtro todo el listado y devuelve todo lo que no tenga el mismo id 
            this.listaempresas = this.listaempresas.filter(emp => emp.id != id);
            return this.listaempresas;
        }

        votosempresa (id = '') {
            this.listaempresas = this.listaempresas.map(emp => {

                if (emp.id == id) {
                    emp.votos++;
                    return emp;
                }else{
                    return emp;
                }
            });
        }
    }

    module.exports = empresas;