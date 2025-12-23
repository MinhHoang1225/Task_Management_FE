import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useLogin } from '@app/core/hooks';
import { yupSync } from '@app/core/libs/utils/yupSync';
import { ROUTES } from '@app/core/types/constants';
import type { LoginPayload } from '@app/core/types/interfaces';
import { loginSchema } from '@app/core/types/validations';

const Login = () => {
  const [form] = Form.useForm<LoginPayload>();
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();

  const onFinish = (values: LoginPayload) => {
    mutate(values, {
      onSuccess: () => {
        message.success('Đăng nhập thành công');
      },
      onError: (err: any) => {
        const errorMsg = err?.response?.data?.message || 'Email hoặc mật khẩu không đúng';
        message.error(errorMsg);
      },
    });
  };

  return (
    <div className='min-h-screen bg-[var(--bg-main)] flex items-center justify-center px-4 py-6'>
      <div
        className='
          w-full max-w-5xl
          grid grid-cols-1 md:grid-cols-2
          bg-[var(--glass-effect)]
          border border-[var(--border-light)]
          rounded-2xl
          shadow-[var(--shadow-3d)]
          overflow-hidden
        '
      >
        <div className='hidden md:flex flex-col justify-center p-12 bg-[var(--bg-surface)] border-r border-[var(--border-light)]'>
          <h1 className='text-4xl font-bold text-[var(--text-primary)] mb-6'>DevBlog</h1>
          <p className='text-[var(--text-secondary)] text-lg leading-relaxed'>
            Chia sẻ kiến thức, quản lý nội dung và xây dựng cộng đồng developer một cách chuyên
            nghiệp.
          </p>
          <div className='mt-10 h-1 w-20 bg-[var(--primary-orange)] rounded-full' />
        </div>

        <div className='p-8 md:p-12 flex items-center bg-[var(--bg-main)] md:bg-transparent'>
          <div className='w-full'>
            <div className='mb-8'>
              <h2 className='text-3xl font-bold text-[var(--text-primary)]'>Đăng nhập</h2>
              <p className='text-[var(--text-secondary)] mt-2'>Chào mừng bạn quay trở lại!</p>
            </div>

            <Form
              form={form}
              layout='vertical'
              onFinish={onFinish}
              requiredMark={false}
              className='space-y-2'
            >
              <Form.Item
                label={<span className='text-[var(--text-secondary)] font-medium'>Email</span>}
                name='email'
                rules={[yupSync(loginSchema)]} // Sử dụng yupSync dùng chung
              >
                <Input
                  size='large'
                  prefix={<MailOutlined className='text-[var(--text-secondary)]' />}
                  placeholder='you@example.com'
                  className='h-12 rounded-lg'
                />
              </Form.Item>

              <Form.Item
                label={<span className='text-[var(--text-secondary)] font-medium'>Mật khẩu</span>}
                name='password'
                rules={[yupSync(loginSchema)]} // Sử dụng yupSync dùng chung
              >
                <Input.Password
                  size='large'
                  prefix={<LockOutlined className='text-[var(--text-secondary)]' />}
                  placeholder='••••••••'
                  className='h-12 rounded-lg'
                />
              </Form.Item>

              <div className='flex justify-end mb-4'>
                <span className='text-sm text-[var(--secondary-blue)] hover:text-[var(--secondary-blue-soft)] cursor-pointer transition-colors'>
                  Quên mật khẩu?
                </span>
              </div>

              <Form.Item>
                <Button
                  htmlType='submit'
                  size='large'
                  loading={isPending}
                  className='
                    w-full h-12
                    bg-[var(--primary-orange)]
                    hover:bg-[var(--primary-orange-hover)]
                    text-white
                    font-bold
                    border-none
                    rounded-lg
                    shadow-lg shadow-orange-500/20
                    transition-all active:scale-[0.98]
                    mt-2
                  '
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>

            <div className='mt-8 text-sm text-center text-[var(--text-secondary)]'>
              Chưa có tài khoản?{' '}
              <span
                onClick={() => navigate(ROUTES.REGISTER)}
                className='cursor-pointer text-[var(--secondary-blue)] hover:text-[var(--secondary-blue-soft)] font-bold transition-all'
              >
                Đăng ký ngay
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
