import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  showCancelButton: false,
  showCloseButton: true
})

// Example, can be called from anywhere
// Toast.fire({
//   icon: 'success',
//   title: 'Example Toast Message'
// })
