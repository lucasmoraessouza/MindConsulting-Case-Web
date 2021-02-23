import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'

import { forwardRef } from 'react'
import { saveId } from '../../../services/auth'

import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import BlockIcon from '@material-ui/icons/Block'
import api from '../../../services/api'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

const tableIcons = {
  Desative: forwardRef((props, ref) => <BlockIcon {...props} ref={ref} />),
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Active: forwardRef((props, ref) => (
    <CheckCircleOutlineIcon {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

export default function TableDashboard() {
  const [infoUser, setInfoUser] = useState([])
  const [refresh, setRefresh] = useState('')
  const history = useHistory()

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  })

  useEffect(() => {
    handleChange()
  }, [refresh])

  const handleEdit = async (rowData) => {
    await saveId(rowData.id)
    history.push('/dashboard/editar')
  }

  const handleDestroy = async (rowData) => {
    try {
      swalWithBootstrapButtons
        .fire({
          title: 'Você tem certeza?',
          text: 'Não tem como voltar atrás depois!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim, deletar!',
          cancelButtonText: 'Não, cancelar!',
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            handleDelete(rowData)
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'Essa ação foi cancelada!',
              'error'
            )
          }
        })
    } catch (err) {}
  }

  const handleDelete = async (rowData) => {
    try {
      const response = await api.delete(`/user/${rowData.id}`)
      setRefresh('')
      setRefresh(true)

      swalWithBootstrapButtons.fire(
        'Deletado!',
        'Deletado com sucesso!',
        'success'
      )
    } catch (err) {}
  }

  const handleActive = async (rowData) => {
    try {
      if (rowData.level == 1) {
        return Swal.fire('Usuário já está ativado.')
      }
      const response = await api.put(`/active/${rowData.id}`)
      setRefresh('')
      setRefresh(true)
    } catch (err) {}
  }

  const handleDesative = async (rowData) => {
    try {
      if (rowData.level == 0) {
        return Swal.fire('Usuário já está desativado.')
      }
      const response = await api.put(`/desative/${rowData.id}`)
      setRefresh('')
      setRefresh(true)
    } catch (err) {}
  }

  const handleChange = async () => {
    try {
      const response = await api.get('/users')
      setInfoUser(response.data)
    } catch (err) {}
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        icons={tableIcons}
        actions={[
          {
            icon: tableIcons.Delete,
            tooltip: 'Deletar',
            onClick: (e, rowData) => {
              handleDestroy(rowData)
            },
          },
          {
            icon: tableIcons.Edit,
            tooltip: 'Editar',
            onClick: (e, rowData) => {
              handleEdit(rowData)
            },
          },
          {
            icon: tableIcons.Desative,
            tooltip: 'Desativar',
            onClick: (e, rowData) => {
              handleDesative(rowData)
            },
          },
          {
            icon: tableIcons.Active,
            tooltip: 'Ativar',
            onClick: (e, rowData) => {
              handleActive(rowData)
            },
          },
        ]}
        columns={[
          { title: 'ID', field: 'id' },
          { title: 'Nome', field: 'name' },
          { title: 'CPF', field: 'cpf' },
          { title: 'E-mail', field: 'email', type: 'email' },
          { title: 'Nível', field: 'level', type: 'numeric' },
        ]}
        data={infoUser}
        title="Lista de Usuários"
      />
    </div>
  )
}
