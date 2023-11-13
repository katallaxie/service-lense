'use client'

import FileUpload from '@/components/FileUpload'
import { Button, FormControl, FormErrorMessage, FormLabel, Icon } from '@/ui'
import { useForm } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'

type FormValues = {
  file_: FileList
}

export default function FileUploadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()
  const onSubmit = handleSubmit(data => console.log('On Submit: ', data))

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return 'Files is required'
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024)
      const MAX_FILE_SIZE = 10
      if (fsMb > MAX_FILE_SIZE) {
        return 'Max file size 10mb'
      }
    }
    return true
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.file_} isRequired>
          <FormLabel>{'File input'}</FormLabel>

          <FileUpload
            accept={'text/yaml'}
            multiple
            register={register('file_', { validate: validateFiles })}
          >
            <Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
          </FileUpload>

          <FormErrorMessage>
            {errors.file_ && errors?.file_.message}
          </FormErrorMessage>
        </FormControl>

        <button>Submit</button>
      </form>
    </>
  )
}
