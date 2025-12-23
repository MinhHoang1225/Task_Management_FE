import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  IdcardOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useRegister } from '@app/core/hooks';
import { yupSync } from '@app/core/libs/utils';
import { ROUTES } from '@app/core/types/constants';
import type { RegisterPayload } from '@app/core/types/interfaces';
import { registerSchema } from '@app/core/types/validations';

const Register = () => {
  const [form] = Form.useForm<RegisterPayload>();
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();

  const onFinish = (values: RegisterPayload) => {
    console.log('Register values:', values);
    mutate(values, {
      onSuccess: () => {
        message.success('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
        navigate(ROUTES.LOGIN);
      },
      onError: (err: any) => {
        const errorMsg = err?.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại';
        message.error(errorMsg);
      },
    });
  };

  return (
    <div className='min-h-screen bg-[var(--bg-main)] flex items-center justify-center px-4 py-10'>
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
        <div className='hidden md:flex flex-col justify-center p-10 bg-[var(--bg-surface)] border-r border-[var(--border-light)]'>
          <h1 className='text-3xl font-bold text-[var(--text-primary)] mb-4 text-center md:text-left'>
            DevBlog
          </h1>
          <p className='text-[var(--text-secondary)] leading-relaxed mb-8'>
            Đăng ký để tham gia cộng đồng chia sẻ kiến thức công nghệ hàng đầu.
          </p>

          <div className='space-y-5'>
            <div className='flex items-center gap-4 group cursor-default'>
              <div className='w-10 h-10 rounded-lg bg-[var(--bg-soft)] flex items-center justify-center text-[var(--primary-orange)] group-hover:bg-[var(--primary-orange)] group-hover:text-white transition-all'>
                <UserOutlined />
              </div>
              <span className='text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'>
                Cá nhân hóa trải nghiệm
              </span>
            </div>
            <div className='flex items-center gap-4 group cursor-default'>
              <div className='w-10 h-10 rounded-lg bg-[var(--bg-soft)] flex items-center justify-center text-[var(--secondary-blue)] group-hover:bg-[var(--secondary-blue)] group-hover:text-white transition-all'>
                <ReadOutlined />
              </div>
              <span className='text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'>
                Lưu trữ bài viết yêu thích
              </span>
            </div>
          </div>
        </div>

        <div className='p-6 md:p-10 flex items-center bg-[var(--bg-main)] md:bg-transparent'>
          <div className='w-full'>
            <h2 className='text-2xl font-semibold text-[var(--text-primary)] mb-6'>Đăng ký</h2>

            <Form
              form={form}
              layout='vertical'
              onFinish={onFinish}
              requiredMark={false}
              className='space-y-1'
            >
              <Form.Item
                label={<span className='text-[var(--text-secondary)]'>Họ và tên</span>}
                name='fullName'
                rules={[yupSync(registerSchema)]}
              >
                <Input size='large' prefix={<UserOutlined />} placeholder='Nguyễn Văn A' />
              </Form.Item>

              <Form.Item
                label={<span className='text-[var(--text-secondary)]'>Username</span>}
                name='username'
                rules={[yupSync(registerSchema)]}
              >
                <Input size='large' prefix={<IdcardOutlined />} placeholder='dev_nguyenvana' />
              </Form.Item>

              <Form.Item
                label={<span className='text-[var(--text-secondary)]'>Email</span>}
                name='email'
                rules={[yupSync(registerSchema)]}
              >
                <Input size='large' prefix={<MailOutlined />} placeholder='you@example.com' />
              </Form.Item>

              <Form.Item
                label={<span className='text-[var(--text-secondary)]'>Mật khẩu</span>}
                name='password'
                rules={[yupSync(registerSchema)]}
              >
                <Input.Password size='large' prefix={<LockOutlined />} placeholder='••••••••' />
              </Form.Item>

              <div className='pt-6'>
                <Button
                  htmlType='submit'
                  size='large'
                  loading={isPending}
                  className='
                    w-full h-12
                    bg-[var(--primary-orange)]
                    hover:bg-[var(--primary-orange-hover)]
                    text-white font-bold
                    border-none rounded-lg
                    shadow-lg shadow-orange-500/20
                    transition-all active:scale-[0.98]
                  '
                >
                  Tạo tài khoản
                </Button>
              </div>
            </Form>

            <div className='mt-8 text-sm text-center text-[var(--text-secondary)]'>
              Đã có tài khoản?{' '}
              <span
                onClick={() => navigate(ROUTES.LOGIN)}
                className='cursor-pointer text-[var(--secondary-blue)] hover:text-[var(--secondary-blue-soft)] font-medium transition-colors'
              >
                Đăng nhập ngay
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
