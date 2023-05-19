<template>
  <label class="avatar-status-100 basic-information text-center" for="imageUpload">
    <img class="avatar-image" :src="src" alt="">
    <span class="avatar-badge bg-primary d-flex align-center justify-center">
      <i class="text-white tio-">photo_camera</i>
    </span>
    <input
      id="imageUpload"
      class="d-none"
      type="file"
      accept=".png, .jpg, .jpeg"
      :disabled="uploading"
      @change="uploadAvatar"
    >
  </label>
</template>

<script setup lang="ts">

interface IProps {
  src?: string;
}
const props = defineProps<IProps>()

const downloadImage = async () => {
  try {
    console.log('downloading file ' + user.avatarFile)
    const { data, error } = await supabase.storage.from('avatars').download(user.avatarFile)
    if (error) { throw error }
    // user.avatarurl = URL.createObjectURL(data)
    console.log(data)
    user.avatarurl = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

const uploadAvatar = async (evt) => {
  console.log(evt)
  files.value = evt.target.files
  try {
    uploading.value = true

    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    let { data, error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

    console.log(filePath)
    console.log(file)
    if (uploadError) { throw uploadError }
    console.log(data)

    user.avatarFile = filePath
    user.avatarurl = URL.createObjectURL(file)

    await updateProfile()
  } catch (error) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}
</script>
